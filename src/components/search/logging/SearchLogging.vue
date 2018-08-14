<template>

    <el-dialog title="搜索"
               :visible.sync="dialogFormVisible"
               @keyup.enter.native="doSearch">
        <el-form :model="search"
                 :label-width="formLabelWidth">
            <el-form-item label="级别">
                <el-select
                        clearable
                        v-model="search.levelString"
                        style="width:100%"
                        placeholder="全部">
                    <el-option label="TRACE"
                               value="TRACE">
                        <span style="color: #409EFF">TRACE</span>
                    </el-option>
                    <el-option label="DEBUG"
                               value="DEBUG">
                        <span style="color: #67C23A">DEBUG</span>
                    </el-option>
                    <el-option label="INFO"
                               value="INFO">
                        <span style="color: #909399">INFO</span>
                    </el-option>
                    <el-option label="WARN"
                               value="WARN">
                        <span style="color: #E6A23C">WARN</span>
                    </el-option>
                    <el-option label="ERROR"
                               value="ERROR">
                        <span style="color: #F56C6C">ERROR</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文件名">
                <el-input
                        clearable
                        v-model="search.callerFilename"
                        auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="类">
                <el-input
                        clearable
                        v-model="search.callerClass"
                        auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="名称">
                <el-input
                        clearable
                        v-model="search.loggerName"
                        auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="日志内容">
                <el-input
                        clearable
                        v-model="search.formattedMessage"
                        auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="referenceFlag">
                <el-select
                        clearable
                        v-model="search.referenceFlag"
                        style="width:100%"
                        placeholder="全部">
                    <el-option label="2"
                               value="2"></el-option>
                    <el-option label="0"
                               value="0"></el-option>
                </el-select>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="doSearch">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                search: {},
                dialogFormVisible: false,
                formLabelWidth: '80px',
                searchFrom: this.Constants.Logging.list.name
            }
        },
        created() {
            let _this = this
            _this.bus.$off('searchDialog')
            _this.bus.$on('searchDialog', function () {
                if (_this.$route.name === _this.searchFrom) {
                    _this.dialogFormVisible = true
                }
            })
        },
        watch: {},
        mounted() {
        },
        methods: {
            doSearch() {
                let _this = this
                _this.bus.$emit(_this.searchFrom, _this.search)
                _this.dialogFormVisible = false
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-pagination {
        margin-top: 4px;
    }
</style>
