<template>
    <el-table
            v-loading="loading"
            element-loading-text="读取数据中..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(80, 90, 100, 0.3)"

            highlight-current-row
            ref="tableCategoryList"
            :data="page.list"
            tooltip-effect="dark"
            :stripe="true"
            :border="true"
            :style="tableStyle"
            @selection-change="tableSelectionHander">
        <el-table-column
                prop="name"
                label="分类名称"
                width="240"
                show-overflow-tooltip>
        </el-table-column>
        <el-table-column
                label="操作"
                width="100">
            <template slot-scope="scope">
                <el-button @click="deleteHandler(scope.row)" type="text" size="small">删除</el-button>
                <el-button @click="editHandler(scope.row)" type="text" size="small">编辑</el-button>
            </template>
        </el-table-column>

    </el-table>
</template>

<script>
    import Blog from '~/api/blog'

    export default {
        components: {
        },
        created () {
            let _this = this
            _this.bus.$on('pageSizeChange', function (search) {
                _this.search = search
                _this.loadPage()
            })
            _this.bus.$on('pageCurrentChange', function (search) {
                _this.search = search
                _this.loadPage()
            })
            _this.bus.$on(this.Constants.Blog.article.name, function (search) {
                _this.search = search
                _this.loadPage()
            })
        },
        data () {
            return {
                page: {},
                search: {},
                loading: false,
                tableStyle: {
                    maxHeight: "600px"
                }
            }
        },
        mounted () {
            let _this = this;
            _this.loadPage()

            this.tableStyle.maxHeight = document.querySelector('.el-main').offsetHeight + "px"
        },
        computed: {
            pageInfo: function () {
                if ('{}' === JSON.stringify(this.page)) {
                    this.page = this.Constants.PageInfo
                }
                let searchInfo = {
                    pageCurrent: this.page.pageCurrent,
                    pageSize: this.Constants.PageInfo.pageSize,
                    totalCount: this.page.total
                }
                searchInfo = Object.assign({}, this.search, searchInfo)
                return searchInfo
            }
        },
        methods: {
            tableSelectionHander (val) {
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
                Blog.getArticleCategories(_this.search)
                    .then(function (response) {
                        _this.page = response
                        _this.bus.$emit('pager', _this.pageInfo)
                        _this.toggleLoading()
                    })
            }
        },
        watch: {
        }
    }
</script>

<style lang="less" scoped>
</style>
