<template>
    <el-menu :default-active="activeIndex"
             :collapse="isCollapse"
             :unique-opened="false"
             :collapse-transition="true"
             class="menu-left"
             @open="handleOpen"
             @close="handleClose"
             @select="handleSelect"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
        <router-link to="/"><h3 style="color: #ffffff">飞鸿博客管理后台</h3></router-link>
        <el-menu-item :index="menu.href"
                      v-for="(menu, index) in menuTree.children"
                      :key="index">
            <i :class="menu.icon"></i>
            <span slot="title">{{menu.menuName}}</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    import Menu from '~/api/menu'

    export default {
        components: {},
        data() {
            return {
                activeIndex: '',
                isCollapse: false,
                menuTree: {},
                menuType: 'blog'
            }
        },
        watch: {
            'activeIndex': (newValue, oldValue) => {
                console.log(newValue, oldValue)
                this.bus.$emit('selectLeftMenu', this.menuType)
            }
        },
        mounted() {
            let _this = this

            //刷新选中侧边菜单
            this.activeIndex = this.$route.path


            Menu.getMenuNav(_this.menuType)
                .then(response => {
                    _this.menuTree = response.data[0]
                });
        },
        created() {
            let _this = this
            _this.bus.$on('selectMenuType', function (type) {
                _this.menuType = type
                Menu.getMenuNav(type).then(response => {
                    _this.menuTree = response.data[0]
                });
            })
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {
                this.$router.push({path: key})
            }
        },
        watch: {
        }
    }
</script>

<style lang="less" scoped>
    .el-menu {
        height: 100vh;
    }
</style>
