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
                    prop="name"
                    label="阿福名称"
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
                    width="100">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="editHandler(scope.row)">编辑</el-button>
                </template>
            </el-table-column>

        </el-table>

        <el-tooltip class="item" effect="dark" content="添加阿福" placement="top-start">
            <el-button type="success"
                       icon="el-icon-edit"
                       class="float-btn"
                       circle
                       v-drag
                       @click.stop="editHandler(undefined, $event)"></el-button>
        </el-tooltip>

    </div>
</template>

<script>
    import Afu from '~/api/afu'

    export default {
        components: {},
        created() {
            let _this = this
            _this.bus.$off('pagerChanged')
            _this.bus.$on('pagerChanged', function (search) {
                _this.search = search
                _this.loadPage()
            })
            _this.bus.$on(_this.Constants.Afu.list.name, function (search) {
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
                afu: {},
                rules: {
                    name: [
                        {required: true, message: '请输入分类名称', trigger: 'blur'}
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
                Afu.getAfus(_this.search)
                    .then(function (response) {
                        _this.page = response
                        _this.bus.$emit('pager', _this.pageInfo)
                        _this.toggleLoading()
                    })
            },
            editHandler(row) {
                let _this = this
                let query = {}
                if (row) {
                    query = {id: row.id}
                }
                _this.$router.push({name: _this.Constants.Afu.edit.name, query: query})
            }
        },
        watch: {}
    }
</script>

<style lang="less" scoped>
</style>
