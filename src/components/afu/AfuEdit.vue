<template>
    <div style="height: 100%;">
        <el-form :model="afu"
                 :rules="rules"
                 ref="afu"
                 label-width="80px"
                 class="form-afu-edit">
            <el-form-item label="名称" prop="name">
                <el-input v-model="afu.name"></el-input>
            </el-form-item>
            <el-form-item label="内容" required prop="content">
                <mavon-editor v-model="afu.content"
                              @imgAdd="$imgAdd"
                              @imgDel="$imgDel"
                              ref="md"></mavon-editor>
            </el-form-item>
        </el-form>
        <edit-bar :save="saveHandler"
                  :delete="deleteHandler"
                  :cancel="cancelHandler"></edit-bar>
    </div>
</template>

<script>
    import Afu from '~/api/afu'
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
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                    context: [
                        {required: true, message: '请输入阿福内容', trigger: 'blur'}
                    ]
                },
                afu: {
                    id: this.$route.query.id,
                    status: 1
                }
            }
        },
        created() {
            let _this = this

        },
        computed: {},
        mounted() {
            let _this = this

            if (!this.afu.id) {
                return
            }
            const loading = this.$loading({
                lock: true,
                text: '读取阿福信息...',
                background: 'rgba(255, 255, 255, 0.4)'
            });
            Afu.getAfuDetail(this.afu.id).then(response => {
                _this.afu = response.data
                loading.close()
            })

        },
        watch: {},
        methods: {
            tagCloseHandler(tag) {
                this.afu.tagList.splice(this.afu.tagList.indexOf(tag), 1);
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
                    this.afu.tagList.push(inputValue);
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
                _this.$refs['afu'].validate((valid) => {
                    if (valid) {
                        Afu.editAfu(_this.afu).then(response => {
                            if (response.errorCode === 'SUCCESS') {
                                _this.$router.push({name: _this.Constants.Afu.list.name})
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
                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    Afu.deleteAfu(_this.afu.id).then(response => {
                        if (response.errorCode === 'SUCCESS') {
                            _this.$router.push({name: _this.Constants.Afu.list.name})
                            this.$message({
                                showClose: true,
                                type: 'success',
                                message: '删除成功!'
                            })
                        } else {
                            this.$message({
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
                let _this = this
                _this.$router.push({name: this.Constants.Afu.list.name})
            }
        }
    }
</script>

<style lang="less" scoped>
    .form-afu-edit {
        height: 100%;
        margin-top: 10px;
        margin-bottom: 100px;
        padding-right: 20px;
    }
</style>
