<template>
    <div>
        <el-container>
            <canvas id="canvas_bg"></canvas>
            <el-header></el-header>
            <el-main>
                        <el-form ref="user" :model="user" :rules="rules" label-width="80px">
                            <el-form-item>
                                <span class="login-right-title">登录管理后台</span>
                            </el-form-item>
                            <el-form-item label="用户名" prop="username">
                                <el-input v-model="user.username"
                                          @keyup.enter.native="login" autocomplete="off">
                                    <i slot="prefix" class="element-icons el-icon-user"></i>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input v-model="user.password" type="password"
                                          @keyup.enter.native="login" autocomplete="off">
                                    <i slot="prefix" class="element-icons el-icon-password"></i>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="验证码" prop="captcha">
                                <el-row>
                                    <el-col :span="18">
                                        <el-input v-model="user.captcha"
                                                  @keyup.enter.native="login" autocomplete="off">
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
                                             class="login-remember-me-checkbox">自动登录
                                </el-checkbox>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" class="btn-login" :loading="loading" @click="login">登录
                                </el-button>
                            </el-form-item>
                        </el-form>
            </el-main>
        </el-container>

    </div>
</template>

<script>
    import request from '../utils/request'

    export default {
        components: {},
        data() {
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
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur'}
                    ],
                    captcha: [
                        {required: true, message: '请输入验证码', trigger: 'blur'},
                        {min: 4, max: 4, message: '长度为4个字符', trigger: 'blur'}
                    ]
                },
                loading: false
            }
        },
        mounted() {
            this.getCaptcha()
            this.setCanvas()
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
                            localStorage.setItem("token", response.data.token)
                            localStorage.setItem("userInfo", JSON.stringify(response.data))
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

            },
            setCanvas() {
                let canvas = document.querySelector('#canvas_bg'),
                    ctx = canvas.getContext('2d'),
                    w = canvas.width = window.innerWidth,
                    h = canvas.height = window.innerHeight,

                    hue = 245,
                    stars = [],
                    count = 0,
                    maxStars = 2300//星星数量

                //星星颜色
                let starStyleCount = 6,
                    starHue = 0,
                    canvasStars = []

                for(let j = 0; j < starStyleCount; j ++) {
                    let canvas2 = document.createElement('canvas'),
                        ctx2 = canvas2.getContext('2d')
                    canvas2.width = 100
                    canvas2.height = 100
                    let half = canvas2.width / 2,
                        gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half)

                    starHue = 360 / starStyleCount + starHue
                    console.log(starHue)
                    gradient2.addColorStop(0.025, '#CCC')
                    gradient2.addColorStop(0.1, 'hsl(' + starHue + ', 100%, 33%)')
                    gradient2.addColorStop(0.25, 'hsl(' + starHue + ', 64%, 6%)')
                    gradient2.addColorStop(1, 'transparent')

                    ctx2.fillStyle = gradient2
                    ctx2.beginPath()
                    ctx2.arc(half, half, half, 0, Math.PI * 2)
                    ctx2.fill()
                    canvasStars.push(canvas2)
                }

                function random(min, max) {
                    if (arguments.length < 2) {
                        max = min
                        min = 0
                    }

                    if (min > max) {
                        let hold = max
                        max = min
                        min = hold
                    }

                    return Math.floor(Math.random() * (max - min + 1)) + min
                }

                function maxOrbit(x, y) {
                    let max = Math.max(x, y),
                        diameter = Math.round(Math.sqrt(max * max + max * max))
                    //星星移动范围，值越大范围越小，
                    return diameter / 2
                }

                let Star = function () {

                    this.orbitRadius = random(maxOrbit(w, h))
                    this.radius = random(60, this.orbitRadius) / 20
                    //星星大小
                    this.orbitX = w / 2
                    this.orbitY = h / 2
                    this.timePassed = random(0, maxStars)
                    //星星移动速度
                    this.speed = random(this.orbitRadius) / 240000;
                    this.alpha = random(4, 10) / 10

                    count++
                    stars[count] = this
                }

                Star.prototype.draw = function () {
                    let x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
                        y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
                        twinkle = random(10)

                    if (twinkle === 1 && this.alpha > 0) {
                        this.alpha -= 0.05
                    } else if (twinkle === 2 && this.alpha < 1) {
                        this.alpha += 0.05
                    }

                    let canvasStar = canvasStars[random(0, starStyleCount - 1)];
                    ctx.globalAlpha = this.alpha
                    ctx.drawImage(canvasStar, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);


                    this.timePassed += this.speed
                }

                for (let i = 0; i < maxStars; i++) {
                    new Star()
                }

                function animation() {
                    ctx.globalCompositeOperation = 'source-over'
                    ctx.globalAlpha = 0.5 //尾巴
                    ctx.fillStyle = 'hsla(' + hue + ', 10%, 2%, 2)'
                    ctx.fillRect(0, 0, w, h)

                    ctx.globalCompositeOperation = 'lighter'
                    for (let i = 1, l = stars.length; i < l; i++) {
                        stars[i].draw()
                    }

                    window.requestAnimationFrame(animation)
                }

                animation()
            }
        },
        created() {
        },
        watch: {}
    }
</script>

<style lang="less" scoped>
    .login-right-title {
        color: #DDD;
        font-size: 3vh;
        font-weight: bold;
    }

    .btn-login {
        width: 100%;
        background-color: transparent;
    }


    .login-remember-me-group {
        margin-bottom: 8px;
    }

    .login-remember-me-checkbox {
        float: left;
    }

    #canvas_bg {
        width: 100%;
        height: 100%;
        display: inline-block;
        vertical-align: baseline;
        position: absolute;
        z-index: 0;
    }

    .el-container {
        position: relative;
        height: 100vh;
        width: 100%;
        /*background-color: #000;*/
        /*background: linear-gradient(to top left, #41a37b, #51dda2);*/
    }

    .el-form {
        width: 420px;
        margin: 0 auto;
    }

    /deep/ .el-input input {
        color: #DDD;
        border-radius: 0;
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-bottom: 1px solid #DDD;
        background-color:transparent;
    }

    /deep/ .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: transparent;
    }
</style>
