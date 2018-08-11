<template>
    <div style="height: 100%">

        <el-table
                v-loading="loading"
                element-loading-text="读取数据中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(80, 90, 100, 0.3)"

                highlight-current-row
                ref="table"
                :data="page.list"
                tooltip-effect="dark"
                :stripe="true"
                :border="true"
                height="100%"
                @selection-change="tableSelectionHander">
            <el-table-column
                    prop="roleName"
                    label="角色名称"
                    width="240"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width="240"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center"
                    width="200">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="editHandler(scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="deleteHandler(scope.row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>

        <el-tooltip class="item" effect="dark" content="添加角色" placement="top-start">
            <el-button type="success"
                       icon="el-icon-edit"
                       class="float-btn"
                       circle
                       v-drag
                       @click.stop="editHandler(undefined, $event)"></el-button>
        </el-tooltip>

        <el-dialog title="编辑角色"
                   :visible.sync="dialogFormVisible"
                   @keyup.enter.native="editHandler()">
            <el-form :model="role"
                     :rules="rules"
                     ref="role"
                     label-width="80px">
                <el-form-item label="角色名" prop="roleName">
                    <el-input
                            clearable
                            v-model="role.roleName"
                            auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="code" prop="code">
                    <el-input
                            clearable
                            v-model="role.code"
                            auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="赋予权限" prop="permissions">
                    <el-tree
                            :data="permissionTree"
                            show-checkbox
                            node-key="id"
                            ref="tree"
                            highlight-current
                            check-on-click-node
                            accordion
                            :default-checked-keys="permissionTreeCheckedArray"
                            :props="defaultProps">
                    </el-tree>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editHandler()">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import Access from '~/api/access'

    export default {
        components: {},
        created() {
            let _this = this
            _this.bus.$off('pagerChanged')
            _this.bus.$on('pagerChanged', function (search) {
                _this.search = search
                _this.loadPage()
            })
            _this.bus.$on(_this.Constants.Access.role.list.name, function (search) {
                _this.search = search
                _this.loadPage()
            })

        },
        data() {
            return {
                page: {},
                search: {},
                loading: false,
                dialogFormVisible: false,
                role: {},
                rules: {
                    roleName: [
                        {required: true, message: '请输入角色名称', trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '请输入code', trigger: 'blur'}
                    ]
                },
                defaultProps: {
                    children: 'children',
                    label: 'permissionName'
                },
                permissionTree: {},
                permissionTreeCheckedArray: []
            }
        },
        mounted() {
            let _this = this;
            _this.loadPage()
            _this.loadPermissionTree()
        },
        computed: {
            pageInfo: function () {
                if ('{}' === JSON.stringify(this.page)) {
                    this.page = this.Constants.PageInfo
                }
                let searchInfo = {
                    pageNum: this.page.pageNum,
                    pageSize: this.Constants.PageInfo.pageSize,
                    total: this.page.total
                }
                searchInfo = Object.assign({}, this.search, searchInfo)
                return searchInfo
            }
        },
        methods: {
            tableSelectionHander(val) {
                console.log(val)
            },
            toggleLoading() {
                if (this.loading) {
                    setTimeout(() => {
                        this.loading = false
                    }, 240)
                } else {
                    this.loading = true
                }
            },
            loadPage() {
                let _this = this
                _this.toggleLoading()
                Access.role.getRoles(_this.search)
                    .then(function (response) {
                        _this.page = response
                        _this.bus.$emit('pager', _this.pageInfo)
                        _this.toggleLoading()
                    })
            },
            deleteHandler(row) {
                let _this = this
                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    Access.role.deleteRole(row.id).then(response => {
                        if (response.errorCode === 'SUCCESS') {
                            _this.page.list = _this.page.list.filter(t => t.id != row.id)
                            this.$message({
                                showClose: true,
                                type: 'success',
                                message: '删除成功!'
                            })
                        }
                    })
                }).catch(() => {
                })
            },
            editHandler(row) {
                let _this = this



                if (_this.$refs.tree
                    && !_this.dialogFormVisible) {
                    _this.$refs.tree.setCheckedKeys([])
                }



                if (!_this.dialogFormVisible) {
                    //显示编辑
                    _this.role = {}
                    if (row) {
                        _this.role = row
                        //编辑，需要获取角色权限
                        _this.loadRolePermissions(row.id)
                    }
                    _this.dialogFormVisible = true
                    return
                }



                if (_this.dialogFormVisible) {
                    let roleEdit = row ? row : _this.role
                        roleEdit.permissions = _this.$refs.tree.getCheckedKeys()

                    _this.$refs['role'].validate((valid) => {
                        if (valid) {
                            Access.role.editRole(roleEdit).then(response => {
                                if (response.errorCode === 'SUCCESS') {

                                    _this.loadPage()
                                    _this.$message({
                                        showClose: true,
                                        type: 'success',
                                        message: '编辑成功!'
                                    })

                                }
                            })
                            _this.dialogFormVisible = false

                        } else {
                            return false;
                        }
                    })
                    return
                }

            },
            loadPermissionTree() {
                let _this = this
                Access.permission.getPermissionTree()
                    .then(response => {
                        _this.permissionTree = response.data
                    });
            },
            loadRolePermissions(roleId) {
                let _this = this

                Access.permission.getRolePermissions(roleId)
                    .then(response => {
                        _this.permissionTreeCheckedArray = response.data
                    });
            }
        },
        watch: {}
    }
</script>

<style lang="less" scoped>
</style>
