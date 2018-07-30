<template>
    <el-row>
        <el-button-group style="float: left">
            <el-button type="danger"
                       size="small"
                       icon="el-icon-del"
                       @click.native="deleteHandler">删除</el-button>
        </el-button-group>
        <el-button-group style="float: right;margin-right: 40px">
            <el-button type="primary"
                       size="small"
                       icon="el-icon-save"
                       @click.native="saveHandler">保存</el-button>
        </el-button-group>
    </el-row>
</template>

<script>

    export default {
        components: {},
        data() {
            return {
            }
        },
        created() {
        },
        watch: {},
        methods: {
            saveHandler() {
                this.bus.$emit('save')
            },
            deleteHandler() {
                this.bus.$emit('delete')
            }
        }
    }
</script>

<style lang="less" scoped>
</style>
