<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                transitionName: 'fade'
            }
        },
        created() {
        }
    }
</script>

<style lang="less">
    @import './styles/transition.less';

    #app {
        font-family: Helvetica, sans-serif;
        text-align: center;
    }

    html, body {
        margin: 0;
        padding: 0;
        background-color: #fbfbfb;
        overflow: hidden;
    }

    /*滚动条整体样式*/
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background-color: transparent;
    }

    /*滚动条里面小方块*/
    ::-webkit-scrollbar-thumb {
        border-radius: 4px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: rgba(53, 255, 21, 0.51);
    }

    /*滚动条里面轨道*/
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        background: #EDEDED;
    }


    .float-btn {
        position: fixed;
        top: 30vh;
        right: 20vw;
        opacity: 0.35;
        z-index: 999;
    }
    .float-btn:hover {
        opacity: 1;
    }
</style>
