<template>
    <el-pagination
            background
            @size-change="pageSizeChangeHandler"
            @current-change="pageNumChangeHandler"
            :current-page="search.pageNum"
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
            _this.bus.$off('pager')
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
            pageNumChangeHandler: function (pageNum) {
                this.search = Object.assign({}, this.search, {pageNum})
                this.bus.$emit('pageNumChange', this.search)
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-pagination {
        margin-top: 4px;
    }
</style>
