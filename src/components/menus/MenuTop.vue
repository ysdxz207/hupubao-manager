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
            <div class="menu-top-btn-toggle el-icon-menus"
                 :class="menuLeftCollapseClass"
                 @click="toggleLeftMenuCollapse">
            </div>
            <el-menu-item :index="menu.code"
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
    import Access from '~/api/access'

    export default {
        components: {},
        data() {
            return {
                user: {},
                menus: [],
                menuLeftCollapseClass: ''
            }
        },
        computed: {
            activeIndex: function () {
                return this.$route.name ? this.$route.name.split('.')[0] : this.Constants.Main.dashbord.name
            }
        },
        mounted() {
            let _this = this
            _this.access = JSON.parse(sessionStorage.getItem("userInfo"))
            Access.menu.getMenuTypes()
                .then(response => {
                    _this.menus = response.data
                });
        },
        methods: {
            handleSelect(key, keyPath) {
                if (key === "btn-toggle") {
                    return
                }
                this.bus.$emit('selectMenuType', key)
            },
            logout() {
                let _this = this;
                request('/logout', {
                    method: 'get'
                }).then(response => {
                    if (response.statusCode !== 200) {
                        _this.$message.error({
                            showClose: true,
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
                        showClose: true,
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
            },
            toggleLeftMenuCollapse() {
                let isCollapse = !!this.menuLeftCollapseClass
                this.menuLeftCollapseClass = isCollapse ? '' : 'menu-left-collapse'
                this.bus.$emit('toggleLeftMenuCollapse', isCollapse)
            }
        },
        created() {
        },
        watch: {}
    }
</script>

<style lang="less" scoped>
    .menu-top {
    }

    .menu-top-btn-toggle,.menu-top-btn-toggle:focus {
        float: left;
        line-height: 60px;
        cursor: pointer;
        font-size: 24px;
        margin-left: 10px;
        margin-right: 20px;
        color: #FFFFFF;
        outline: none;

        transition: all 0.2s ease-in-out;
        -webkit-transition: all 0.2s ease-in-out;
        -moz-transition: all 0.2s ease-in-out;
        -o-transition: all 0.2s ease-in-out;
    }

    .menu-top-btn-toggle.menu-left-collapse {
        transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
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
