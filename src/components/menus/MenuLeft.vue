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
        <router-link to="/">
            <i style="color: #ffffff;font-size: 32px;line-height: 60px" class="el-icon-home"></i>
        </router-link>
        <el-menu-item :index="menu.href"
                      v-for="(menu, index) in menuTree.children"
                      :key="index">
            <i :class="menu.icon"></i>
            <span slot="title">{{menu.menuName}}</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    import Access from '~/api/access'

    export default {
        components: {},
        data() {
            return {
                activeIndex: '',
                isCollapse: true,
                menuTree: {}
            }
        },
        computed: {
            menuType: {
                set: function (newValue) {
                    return newValue;
                },
                get: function () {
                    return this.$route.name ? this.$route.name.split('.')[0] : 'blog'
                }
            }
        },
        watch: {
        },
        mounted() {
            let _this = this

            Access.menu.getMenuNav(_this.menuType)
                .then(response => {
                    _this.menuTree = response.data[0]
                });
            _this.activeIndex = _this.$route.path

        },
        created() {
            let _this = this
            _this.bus.$on('selectMenuType', function (type) {
                _this.menuType = type
                _this.activeIndex = ''
                Access.menu.getMenuNav(type).then(response => {
                    _this.menuTree = response.data[0]
                });
            })

            //左侧菜单收起展开
            _this.bus.$on('toggleLeftMenuCollapse', function (isCollapse) {
                _this.isCollapse = isCollapse
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
        border-right: solid 1px rgb(134, 134, 134);
    }

</style>
