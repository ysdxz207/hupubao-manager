<template>
    <div style="height: 100%;">
        <el-form :model="afuType"
                 :rules="rules"
                 ref="afuType"
                 label-width="80px"
                 class="form-afuType-edit">
            <el-form-item label="名称" prop="name">
                <el-input v-model="afuType.name"></el-input>
            </el-form-item>
            <el-form-item label="私钥">
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 10}"
                        placeholder="私钥将会自动创建"
                        readonly
                        v-model="afuType.privateKey">
                </el-input>
            </el-form-item>
            <el-form-item label="公钥">
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 8}"
                        placeholder="公钥将会自动创建"
                        readonly
                        v-model="afuType.publicKey">
                </el-input>
            </el-form-item>
        </el-form>
        <edit-bar :save="saveHandler"
                  :delete="deleteHandler"
                  :cancel="cancelHandler"
                  :disabledSave="disabledSave"></edit-bar>
    </div>
</template>

<script>
    import Afu from '~/api/afu'
    import EditBar from '~/components/widgets/EditBar'

    export default {
        components: {
            EditBar
        },
        data() {
            return {
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ]
                },
                afuType: {
                    id: this.$route.query.id,
                    status: 1
                },
                disabledSave: false
            }
        },
        created() {
            let _this = this
        },
        computed: {},
        mounted() {
            let _this = this

            if (!this.afuType.id) {
                return
            }
            _this.disabledSave = true
            const loading = this.$loading({
                lock: true,
                text: '读取阿福类别信息...',
                background: 'rgba(255, 255, 255, 0.4)'
            });
            Afu.getAfuTypeDetail(this.afuType.id).then(response => {
                _this.afuType = response.data
                loading.close()
            })

        },
        watch: {},
        methods: {
            tagCloseHandler(tag) {
                this.afuType.tagList.splice(this.afuType.tagList.indexOf(tag), 1);
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
                    this.afuType.tagList.push(inputValue);
                }
                this.tagInputVisible = false;
                this.inputValue = '';
            },
            saveHandler() {
                let _this = this
                _this.$refs['afuType'].validate((valid) => {
                    if (valid) {
                        Afu.editAfuType(_this.afuType).then(response => {
                            if (response.errorCode === 'SUCCESS') {
                                _this.$router.push({name: _this.Constants.Afu.type.name})
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
                    Afu.deleteAfuType(_this.afuType.id).then(response => {
                        if (response.errorCode === 'SUCCESS') {
                            _this.$router.push({name: _this.Constants.Afu.type.name})
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
                this.$router.push({name: this.Constants.Afu.type.name})
            }
        }
    }
</script>

<style lang="less" scoped>
    .form-afuType-edit {
        height: 100%;
        margin-top: 10px;
        margin-bottom: 100px;
        padding-right: 20px;
    }
</style>
