<template>
    <el-container>
        <el-header></el-header>
        <el-main>
            <el-row :gutter="20">
                <el-col :span="16" :xs="0" :sm="14" class="login-left">&nbsp;</el-col>
                <el-col :span="8" :xs="24" :sm="10" class="login-right">
                    <el-form ref="user" :model="user" :rules="rules" label-width="80px">
                        <el-form-item>
                            <span class="login-right-title">登录管理后台</span>
                        </el-form-item>
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="user.username"
                                      @keyup.enter.native="login">
                                <i slot="prefix" class="element-icons el-icon-user"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="user.password" type="password"
                                      @keyup.enter.native="login">
                                <i slot="prefix" class="element-icons el-icon-password"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="验证码" prop="captcha">
                            <el-row>
                                <el-col :span="18">
                                    <el-input v-model="user.captcha"
                                              @keyup.enter.native="login">
                                        <i slot="prefix" class="element-icons el-icon-user"></i>
                                    </el-input>
                                </el-col>
                                <el-col :span="6">
                                    <img :src="captchaImg" @click="getCaptcha" style="cursor: pointer"/>
                                </el-col>
                            </el-row>

                        </el-form-item>
                        <el-form-item prop="rememberMe"
                                      class="login-remember-me-group">
                            <el-checkbox v-model="user.rememberMe"
                                         class="login-remember-me-checkbox">自动登录</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="btn-login" :loading="loading" @click="login">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import request from '../utils/request'

    export default {
        components: {
        },
        data () {
            return {
                user: {
                    username: '',
                    password: '',
                    captcha: '',
                    rememberMe: false
                },
                captchaImg: '',
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur' }
                    ],
                    captcha: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                        { min: 4, max: 4, message: '长度为4个字符', trigger: 'blur' }
                    ]
                },
                loading: false
            }
        },
        mounted() {
            this.getCaptcha()
        },
        methods: {
            getCaptcha() {
                let _this = this;
                request({
                    data: {
                        service: _this.Constants.Login.captcha.service,
                        bizContent: {}
                    }
                }).then(response => {
                    _this.captchaImg = response.data
                }).catch(error => {

                    // _this.$message({
                    //     message: error.message,
                    //     type: 'error'
                    // })
                })
            },
            login() {
                let _this = this;
                _this.$refs['user'].validate((valid) => {
                    if (!valid) {
                        return
                    }
                    _this.loading = true
                    request({
                        data: {
                            service: _this.Constants.Login.login.service,
                            bizContent: _this.user
                        }
                    }).then(response => {
                        _this.loading = false
                        if (response.errorCode === 'WRONG_USERNAME_OR_PASSWORD_ERROR') {
                            _this.getCaptcha()
                        }
                        if (response.statusCode !== 200) {
                            _this.$message.error({
                                showClose: true,
                                message: response.message,
                                duration: 5 * 1000
                            })
                        } else {
                            sessionStorage.setItem("token", response.data.token)
                            sessionStorage.setItem("userInfo", JSON.stringify(response.data))
                            _this.$router.push({path: '/'})
                        }
                    }).catch(error => {
                        _this.loading = false
                        _this.$message.error({
                            showClose: true,
                            message: error,
                            duration: 5 * 1000
                        })
                    })
                })

            }
        },
        created () {
        },
        watch: {
        }
    }
</script>

<style lang="less" scoped>
    .login-right-title {
        color: #5c5c5c;
        font-size: 3vh;
        font-weight: bold;
    }
    .btn-login {
        width: 100%;
    }
    .login-remember-me-group {
        margin-bottom: 8px;
    }
    .login-remember-me-checkbox {
        float: left;
    }
</style>
