<template>
    <el-row class="edit-bar">
        <el-col :span="7">
            <el-button-group>
                <el-button type="danger"
                           size="mini"
                           icon="el-icon-del"
                           @click.native="deleteHandler">删除</el-button>
            </el-button-group>
        </el-col>
        <el-col :span="7">
            <el-button-group>
                <el-button type="info"
                           size="mini"
                           icon="el-icon-back"
                           @click.native="cancelHandler">取消</el-button>
            </el-button-group>
        </el-col>
        <el-col :span="8">
            <el-button-group>
                <el-button type="primary"
                           size="mini"
                           icon="el-icon-save"
                           @click.native="saveHandler">保存</el-button>
            </el-button-group>
        </el-col>
    </el-row>
</template>

<script>

    export default {
        components: {
        },
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
            },
            cancelHandler() {
                this.$router.push({name: this.Constants.Blog.article.name})
            }
        }
    }
</script>

<style lang="less" scoped>
    .edit-bar {
        width: 90vw;
        height: 40px;
        line-height: 40px;
        background-color: #eeeeee;
        position: fixed;
        bottom: 0;
        z-index: 9999;
    }
</style>
