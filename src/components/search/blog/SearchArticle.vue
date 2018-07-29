<template>

    <el-dialog title="搜索"
               :visible.sync="dialogFormVisible"
               @keyup.enter.native="doSearch">
        <el-form :model="search"
                 :label-width="formLabelWidth">
            <el-form-item label="标题">
                <el-input
                        clearable
                        v-model="search.title"
                        auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="分类">
                <el-select
                        clearable
                        v-model="search.categoryId"
                        style="width:100%"
                        placeholder="全部分类">
                    <el-option :label="category.name"
                               :value="category.id"
                               v-for="(category, index) in categoryList"
                               :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标签">
                <el-select
                        clearable
                        v-model="search.tagId"
                        style="width:100%"
                        placeholder="全部标签">
                    <el-option :label="tag.name"
                               :value="tag.id"
                               v-for="(tag, index) in tagList"
                               :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发布状态">
            <el-select
                    clearable
                    v-model="search.status"
                    style="width:100%"
                    placeholder="全部状态">
                <el-option label="已发布"
                           value="1"></el-option>
                <el-option label="未发布"
                           value="0"></el-option>
            </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="doSearch">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import Blog from '~/api/blog'

    export default {
        components: {},
        data() {
            return {
                search: {},
                dialogFormVisible: false,
                formLabelWidth: '120px',
                categoryList: [],
                tagList: [],
                searchFrom: this.Constants.Blog.article.name
            }
        },
        created() {
            let _this = this
            _this.bus.$on('searchDialog', function () {
                if (_this.$route.name === _this.searchFrom) {
                    _this.dialogFormVisible = true
                }
            })
        },
        watch: {},
        mounted() {
            Blog.getArticleCategories({
                pageSize: 1024
            }).then(response => {
                this.categoryList = response.list
            })
            Blog.getArticleTags({
                pageSize: 1024
            }).then(response => {
                this.tagList = response.list
            })
        },
        methods: {
            doSearch() {
                let _this = this
                _this.bus.$emit(_this.searchFrom, _this.search)
                _this.dialogFormVisible = false
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-pagination {
        margin-top: 4px;
    }
</style>
