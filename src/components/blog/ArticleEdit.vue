<template>
    <el-form :model="article"
             :rules="rules"
             ref="article"
             label-width="100px"
             class="form-article-edit">
        <el-form-item label="标题" prop="title">
            <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="categoryId">
            <el-select
                    clearable
                    v-model="article.categoryId"
                    style="width:100%"
                    placeholder="默认分类">
                <el-option :label="category.name"
                           :value="category.id"
                           v-for="(category, index) in categoryList"
                           :key="index"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="标签" required>
            <el-input v-model="article.tags"></el-input>
        </el-form-item>
        <el-form-item label="内容" required>
            <mavon-editor v-model="article.context"></mavon-editor>
        </el-form-item>
    </el-form>
</template>

<script>
    import Blog from '~/api/blog'
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'

    export default {
        components: {
            mavonEditor
        },
        data() {
            return {
                rules: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' },
                        { min: 1, message: '标题不可为空', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                },
                article: {
                    id: this.$route.query.id
                },
                categoryList: [],
                tagList: [],
                tagInputVisible: false,
                inputValue: ''
            }
        },
        created() {
            let _this = this
            _this.bus.$off('save')
            _this.bus.$on('save', function () {
                Blog.editArticle(_this.article).then(response => {
                    if (response.errorCode === 'SUCCESS') {
                        _this.$router.push({path:'/blog/article'})
                    }
                })
            })
            _this.bus.$off('delete')
            _this.bus.$on('delete', function () {
                Blog.deleteArticle(_this.article).then(response => {
                    if (response.errorCode === 'SUCCESS') {
                        _this.$router.push({path:'/blog/article'})
                    }
                })
            })

        },
        computed: {
        },
        mounted() {
            let _this = this
            Blog.getArticleDetail(this.article.id).then(response => {
                _this.article = response.data
            })
            Blog.getArticleCategories({
                pageSize: 1024
            }).then(response => {
                this.categoryList = response.list
            })
            // Blog.getArticleTags({
            //     pageSize: 1024
            // }).then(response => {
            //     this.tagList = response.list
            // })
        },
        watch: {},
        methods: {
            tagCloseHandler(tag) {
                this.article.tagList.splice(this.article.tagList.indexOf(tag), 1);
            },
            showTagInput() {
                this.tagInputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.article.tagList.push(inputValue);
                }
                this.tagInputVisible = false;
                this.inputValue = '';
            }
        }
    }
</script>

<style lang="less" scoped>
    .form-article-edit {
        margin-top: 10px;
        margin-bottom: 100px;
        padding-right: 20px;
    }

</style>
