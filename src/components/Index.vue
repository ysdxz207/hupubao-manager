<template>

    <el-container>
        <el-aside width="16%">
            <menu-left></menu-left>
        </el-aside>
        <el-container>
            <el-header><menu-top></menu-top></el-header>
            <el-main>
                <router-view name="toolbar"
                             :key="1"
                             class="toolbar"></router-view>
                <router-view :key="2"></router-view>
            </el-main>
            <el-footer style="height: 40px;">
                <router-view name="footer"></router-view>
            </el-footer>
        </el-container>
    </el-container>
</template>

<script>
    import MenuTop from './menus/MenuTop'
    import MenuLeft from './menus/MenuLeft'

    export default {
        components: {
            MenuTop,
            MenuLeft
        },
        data () {
            return {
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        created () {
        },
        watch: {
        }
    }
</script>

<style lang="less" scoped>

    @import '../styles/transition.less';


    .el-header {
        padding: 0;
    }
    .el-main {
        padding: 0;
        height: 80vh;
    }
    .el-footer {
        width: 100%;
        z-index: 1;
        background-color: #f7f7f7;
    }

</style>
