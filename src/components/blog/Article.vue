<template>
    <div style="height: 100%;">
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
                    prop="title"
                    label="标题"
                    width="240"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="category"
                    label="分类"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="tags"
                    label="标签"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="创建时间"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
                    align="center"
                    show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.status === 1 ? 'success' : 'danger'"
                            disable-transitions>{{scope.row.status === 1 ? '已发布' : '未发布'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    align="center"
                    width="200">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="success"
                            @click="previewHandler(scope.row)">预览</el-button>
                    <el-button
                            size="mini"
                            @click="editHandler(scope.row)">编辑</el-button>
                </template>
            </el-table-column>

        </el-table>

        <el-tooltip class="item" effect="dark" content="写文章" placement="top-start">
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
    import Blog from '~/api/blog'


    export default {
        components: {
        },
        directives: {
        },
        created () {
            let _this = this
            _this.bus.$off('pagerChanged')
            _this.bus.$on('pagerChanged', function (search) {
                _this.search = search
                _this.loadPage()
            })
            _this.bus.$off(this.Constants.Blog.article.name)
            _this.bus.$on(this.Constants.Blog.article.name, function (search) {
                _this.search = search
                _this.loadPage()
            })
        },
        mounted () {
            let _this = this;
            _this.loadPage()

        },
        data () {
            return {
                page: {},
                search: {},
                loading: false
            }
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
        watch: {
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
            previewHandler(row) {
                window.open('http://hupubao.win/article/detail?id=' + row.id)
            },
            editHandler(row, e) {
                if (e && e.target.classList.contains('draging')) {
                    return
                }
                let query = row ? {id: row.id} : {}
                this.$router.push({name: this.Constants.Blog.articleEdit.name, query: query})
            },
            loadPage() {
                let _this = this
                _this.toggleLoading()
                Blog.getArticles(_this.search)
                    .then(function (response) {
                        _this.page = response
                        _this.bus.$emit('pager', _this.pageInfo)
                        _this.toggleLoading()
                    })
            }
        }
    }

</script>

<style lang="less" scoped>



</style>
