<template>
    <el-pagination
            background
            @size-change="pageSizeChangeHandler"
            @current-change="pageCurrentChangeHandler"
            :current-page="search.pageCurrent"
            :page-sizes="[10, 20, 40, 100]"
            :page-size="search.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="search.total">
    </el-pagination>
</template>

<script>

    export default {
        components: {},
        data() {
            return {
                search: {}
            }
        },
        created() {
            let _this = this
            _this.bus.$on('pager', function (search) {
                _this.search = search
            })
        },
        watch: {},
        methods: {
            pageSizeChangeHandler: function (pageSize) {
                this.search = Object.assign({}, this.search, {pageSize})
                this.Constants.PageInfo.pageSize = pageSize
                this.bus.$emit('pageSizeChange', this.search)
            },
            pageCurrentChangeHandler: function (pageCurrent) {
                this.search = Object.assign({}, this.search, {pageCurrent})
                this.bus.$emit('pageCurrentChange', this.search)
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-pagination {
        margin-top: 4px;
    }
</style>
