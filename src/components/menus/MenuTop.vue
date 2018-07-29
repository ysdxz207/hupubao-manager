<template>
    <div>
        <el-menu
                :default-active="activeIndex"
                class="menu-top"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-menu-item :index="menu.id"
                          v-for="(menu,index) in menus"
                          :key="index">
                <i :class="menu.icon"></i>
                {{menu.menuName}}
            </el-menu-item>

            <span class="menu-top-user-info-group">
                <el-button size="mini"
                           type="warning"
                           plain
                           icon="el-icon-search"
                           @click.native="searchHander">搜索</el-button>
                <el-dropdown @command="handleCommand">
                    <i class="element-icons el-icon-user">{{user.nickname}}</i>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="logout">
                          <i class="element-icons el-icon-logout">退出</i>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </span>

        </el-menu>
    </div>
</template>

<script>
    import request from '~/utils/request'
    import Menu from '~/api/menu'

    export default {
        components: {},
        data() {
            return {
                user: {},
                menus: [],
                activeIndex: ''
            }
        },
        mounted() {
            let _this = this
            _this.user = JSON.parse(sessionStorage.getItem("userInfo"))
            Menu.getMenuTypes()
                .then(response => {
                    _this.menus = response.data
                });
        },
        methods: {
            handleSelect(key, keyPath) {
                this.bus.$emit('selectMenuType', key)
            },
            logout() {
                let _this = this;
                request('/logout', {
                    method: 'get'
                }).then(response => {
                    if (response.statusCode !== 200) {
                        _this.$message.error({
                            message: response.message,
                            duration: 5 * 1000
                        })
                    } else {
                        sessionStorage.removeItem("userInfo")
                        sessionStorage.removeItem("token")
                        _this.$router.push({path: '/'})
                    }
                }).catch(error => {
                    _this.$message.error({
                        message: error,
                        duration: 5 * 1000
                    })
                })
            },
            handleCommand(command) {
                let _this = this
                switch (command) {
                    case 'logout':
                        _this.logout()
                        break
                }
            },
            searchHander() {
                this.bus.$emit('searchDialog')
            }
        },
        created() {
            this.bus.$on('selectLeftMenu', function (menuType) {
                this.activeIndex = menuType
            })
        },
        watch: {}
    }
</script>

<style lang="less" scoped>
    .menu-top {
    }

    .menu-top-user-info-group {
        float: right;
        line-height: 60px;
    }

    .el-icon-user {
        color: #ffffff;
        font-size: 24px;
        cursor: pointer;
        margin-left: 28px;
        margin-right: 20px;
    }
</style>
