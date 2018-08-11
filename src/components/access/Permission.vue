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
                    prop="permissionName"
                    label="权限名称"
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

        <el-tooltip class="item" effect="dark" content="添加权限" placement="top-start">
            <el-button type="success"
                       icon="el-icon-edit"
                       class="float-btn"
                       circle
                       v-drag
                       @click.stop="editHandler(undefined, $event)"></el-button>
        </el-tooltip>

        <el-dialog title="添加权限"
                   :visible.sync="dialogFormVisible"
                   @keyup.enter.native="editHandler()">
            <el-form :model="permission"
                     :rules="rules"
                     ref="permission"
                     label-width="80px">
                <el-form-item label="权限名" prop="name">
                    <el-input
                            clearable
                            v-model="permission.name"
                            auto-complete="off"></el-input>
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
            _this.bus.$on(_this.Constants.Access.permission.name, function (search) {
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
                permission: {},
                rules: {
                    name: [
                        {required: true, message: '请输入权限名称', trigger: 'blur'}
                    ]
                }
            }
        },
        mounted() {
            let _this = this;
            _this.loadPage()
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
                Access.permission.getPermissionList(_this.search)
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
                    Access.permission.deletePermission(row).then(response => {
                        if (response.errorCode === 'SUCCESS') {
                            _this.page.list = _this.page.list.filter(t => t.id != row.id)
                            this.$message({
                                showClose: true,
                                type: 'success',
                                message: '删除成功!'
                            })
                        } else {
                            this.$message({
                                showClose: true,
                                type: 'error',
                                message: '删除失败：' + response.message
                            })
                        }
                    })
                }).catch(() => {
                })
            },
            editHandler(row) {
                let _this = this
                if (row) {
                    _this.permission = row
                }

                if (!_this.dialogFormVisible) {
                    //显示编辑

                    _this.dialogFormVisible = true
                    return
                }

                if (_this.dialogFormVisible) {
                    let newTag = !row

                    _this.$refs['permission'].validate((valid) => {
                        if (valid) {
                            console.log(newTag)
                            Access.permission.editPermission(newTag ? _this.permission : row).then(response => {
                                if (response.errorCode === 'SUCCESS') {

                                    _this.loadPage()
                                    _this.$message({
                                        showClose: true,
                                        type: 'success',
                                        message: '编辑成功!'
                                    })
                                    _this.dialogFormVisible = false

                                } else {
                                    _this.$message({
                                        showClose: true,
                                        type: 'error',
                                        message: '编辑失败!'
                                    })
                                }
                            })
                        } else {
                            return false;
                        }
                    })
                    return
                }

            }
        },
        watch: {}
    }
</script>

<style lang="less" scoped>
</style>
