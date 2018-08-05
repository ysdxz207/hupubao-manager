<template>
    <div style="height: 100%;">
        <el-form :model="article"
                 :rules="rules"
                 ref="article"
                 label-width="80px"
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
            <el-form-item label="标签">
                <el-input v-model="article.tags"></el-input>
            </el-form-item>
            <el-form-item label="内容" required prop="context">
                <mavon-editor v-model="article.context"
                              @imgAdd="$imgAdd"
                              @imgDel="$imgDel"
                              ref="md"></mavon-editor>
            </el-form-item>
            <el-form-item label="发布状态" prop="status">
                <el-col :span="1">
                    <el-switch
                            v-model="article.status"
                            active-color="#13ce66"
                            inactive-color="#8D8D8D"
                            :active-value="1"
                            :inactive-value="0">
                    </el-switch>
                </el-col>
            </el-form-item>
        </el-form>
        <edit-bar :save="saveHandler"
                  :delete="deleteHandler"
                  :cancel="cancelHandler"></edit-bar>
    </div>
</template>

<script>
    import Blog from '~/api/blog'
    import Image from '~/api/image'
    import {mavonEditor} from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import EditBar from '~/components/widgets/EditBar'

    export default {
        components: {
            mavonEditor,
            EditBar
        },
        data() {
            return {
                rules: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'}
                    ],
                    context: [
                        {required: true, message: '请输入文章内容', trigger: 'blur'}
                    ]
                },
                article: {
                    id: this.$route.query.id,
                    status: 1
                },
                categoryList: [],
                tagList: [],
                tagInputVisible: false,
                inputValue: '',
                statusList: [
                    {status: 1, name: '发布'},
                    {status: 0, name: '不发布'}
                ]
            }
        },
        created() {
            let _this = this

        },
        computed: {},
        mounted() {
            let _this = this

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

            if (!this.article.id) {
                return
            }
            const loading = this.$loading({
                lock: true,
                text: '读取文章信息...',
                background: 'rgba(255, 255, 255, 0.4)'
            });
            Blog.getArticleDetail(this.article.id).then(response => {
                _this.article = response.data
                loading.close()
            })

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
            },
            $imgAdd(pos, $file) {
                // 第一步.将图片上传到服务器.
                Image.upload($file).then((response) => {
                    // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                    // $vm.$img2Url 详情见本页末尾
                    this.$refs.md.$img2Url(pos, response.data.url);
                })
            },
            $imgDel(pos) {
                // Image.delete($file).then((response) => {
                //
                // })
            },
            saveHandler() {
                let _this = this
                _this.$refs['article'].validate((valid) => {
                    if (valid) {
                        Blog.editArticle(_this.article).then(response => {
                            if (response.errorCode === 'SUCCESS') {
                                _this.$router.push({path: '/blog/article'})
                                this.$message({
                                    showClose: true,
                                    type: 'success',
                                    message: '编辑成功!'
                                })
                            } else {
                                this.$message({
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
            },
            deleteHandler() {
                let _this = this
                _this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    Blog.deleteArticle(_this.article).then(response => {
                        if (response.errorCode === 'SUCCESS') {
                            _this.$router.push({name: _this.Constants.Blog.article.name})
                            _this.$message({
                                showClose: true,
                                type: 'success',
                                message: '删除成功!'
                            })
                        } else {
                            _this.$message({
                                showClose: true,
                                type: 'error',
                                message: '删除失败!'
                            })
                        }
                    })
                }).catch(() => {
                })
            },
            cancelHandler() {
                this.$router.push({name: this.Constants.Blog.article.name})
            }
        }
    }
</script>

<style lang="less" scoped>
    .form-article-edit {
        height: 100%;
        margin-top: 10px;
        margin-bottom: 100px;
        padding-right: 20px;
    }
</style>
