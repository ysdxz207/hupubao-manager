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
                           :disabled="disabledSave"
                           @click.native="saveHandler">保存</el-button>
            </el-button-group>
        </el-col>
    </el-row>
</template>

<script>

    export default {
        props: {
            save: {
                type: Function,
                default: function () {

                }
            },
            delete: {
                type: Function,
                default: function () {

                }
            },
            cancel: {
                type: Function,
                default: function () {

                }
            },
            disabledSave: {
                type: Boolean,
                default: false
            },
            disabledDelete: {
                type: Boolean,
                default: false
            },
            disabledCancel: {
                type: Boolean,
                default: false
            }
        },
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
                this.save()
            },
            deleteHandler() {
                this.delete()
            },
            cancelHandler() {
                this.cancel()
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
