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
            <el-tag
                    :key="tag"
                    v-for="tag in article.tagList"
                    closable
                    :disable-transitions="false"
                    @close="tagCloseHandler(tag)">
                {{tag.name}}
            </el-tag>
            <el-input
                    class="input-new-tag"
                    v-if="tagInputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showTagInput">+ New Tag</el-button>
        </el-form-item>
        <el-form-item label="即时配送" prop="delivery">
            <el-switch v-model="article.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质" prop="type">
            <el-checkbox-group v-model="article.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源" prop="resource">
            <el-radio-group v-model="article.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
            <el-input type="textarea" v-model="article.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('article')">立即创建</el-button>
            <el-button @click="resetForm('article')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import Blog from '~/api/blog'

    export default {
        components: {},
        data() {
            return {
                rules: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
                    id: this.$route.params.id,
                    tags: []
                },
                categoryList: [],
                tagList: [],
                tagInputVisible: false,
                inputValue: ''
            }
        },
        created() {
            let _this = this
        },
        computed: {
        },
        mounted() {
            let _this = this
            console.log(this.article.id)
            Blog.getArticleDetail(this.article.id).then(response => {
                _this.article = response.data
            })
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
        padding-right: 20px;
    }

    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>
