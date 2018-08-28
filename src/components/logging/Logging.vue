<template>
    <div style="height: 100%">

        <el-table
                v-loading="loading"
                element-loading-text="读取数据中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(80, 90, 100, 0.3)"

                highlight-current-row
                ref="table"
                :data="page.list"
                tooltip-effect="dark"
                :border="true"
                height="100%"
                @selection-change="tableSelectionHander">
            <el-table-column
                    type="expand"
                    prop="callerLine"
                    label="调用行"
                    width="80"
                    align="center"
                    show-overflow-tooltip>
                <template slot-scope="props">

                    <el-card class="logging-table-expand">
                        <el-row style="text-align: left">
                            <el-col :span="12">
                                <p>类：{{ props.row.callerClass }}</p>
                                <p>arg0：{{ props.row.arg0 }}</p>
                                <p>arg2：{{ props.row.arg2 }}</p>
                                <p>名称：{{ props.row.loggerName }}</p>
                            </el-col>
                            <el-col :span="12">
                                <p>文件名：{{ props.row.callerFilename }}</p>
                                <p>referenceFlag：{{ props.row.referenceFlag }}</p>
                                <p>arg1：{{ props.row.arg1 }}</p>
                                <p>arg3：{{ props.row.arg3 }}</p>
                                <p>日志内容：{{ props.row.formattedMessage }}</p>
                            </el-col>
                        </el-row>
                    </el-card>

                </template>
            </el-table-column>
            <el-table-column
                    prop="callerMethod"
                    label="调用者方法"
                    width="100"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="levelString"
                    label="级别"
                    width="100"
                    align="center"
                    show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-tooltip content="点击显示异常信息"
                                placement="left"
                                v-if="scope.row.exception">
                        <el-tag :type="getLevelStringType(scope.row.levelString)"
                            @click.native="showException(scope.row.exception)">{{scope.row.levelString}}</el-tag>
                    </el-tooltip>
                    <el-tag v-else :type="getLevelStringType(scope.row.levelString)">{{scope.row.levelString}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="callerClass"
                    label="类"
                    width="240"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="callerFilename"
                    label="文件名"
                    width="140"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="loggerName"
                    label="名称"
                    width="80"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="formattedMessage"
                    label="日志内容"
                    width="280"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="timestmp"
                    label="时间"
                    width="160"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>
        </el-table>

        <el-dialog title="异常信息"
                   :visible.sync="dialogExceptionVisible"
                   style="text-align: left"
                   :fullscreen="true">
            <el-input type="textarea"
                      resize="none"
                      spellcheck="false"
                      :autosize="{ minRows: 2, maxRows: 22}"
                      :value="exception"></el-input>
        </el-dialog>
    </div>
</template>

<script>
    import Logging from '~/api/logging'

    export default {
        components: {},
        created() {
            let _this = this
            _this.bus.$off('pagerChanged')
            _this.bus.$on('pagerChanged', function (search) {
                _this.search = search
                _this.loadPage()
            })
            _this.bus.$on(_this.Constants.Logging.list.name, function (search) {
                _this.search = search
                _this.loadPage()
            })

        },
        data() {
            return {
                page: {},
                search: {},
                loading: false,
                dialogFormVisible: false,
                dialogExceptionVisible: false,
                logging: {},
                rules: {
                    name: [
                        {required: true, message: '请输入日志名称', trigger: 'blur'}
                    ]
                },
                exception: ''
            }
        },
        mounted() {
            let _this = this;
            _this.loadPage()
        },
        computed: {
            pageInfo: function () {
                if ('{}' === JSON.stringify(this.page)) {
                    this.page = this.Constants.PageInfo
                }
                let searchInfo = {
                    pageNum: this.page.pageNum,
                    pageSize: this.Constants.PageInfo.pageSize,
                    total: this.page.total
                }
                searchInfo = Object.assign({}, this.search, searchInfo)
                return searchInfo
            }
        },
        methods: {
            tableSelectionHander(val) {
                console.log(val)
            },
            toggleLoading() {
                if (this.loading) {
                    setTimeout(() => {
                        this.loading = false
                    }, 240)
                } else {
                    this.loading = true
                }
            },
            loadPage() {
                let _this = this
                _this.toggleLoading()
                Logging.getLoggings(_this.search)
                    .then(function (response) {
                        _this.page = response
                        _this.bus.$emit('pager', _this.pageInfo)
                        _this.toggleLoading()
                    })
            },
            getLevelStringType(levelString) {
                switch (levelString) {
                    case 'TRACE':
                        return 'primary'
                    case 'DEBUG':
                        return 'success'
                    case 'INFO':
                        return 'info'
                    case 'WARN':
                        return 'warning'
                    case 'ERROR':
                        return 'danger'

                }
            },
            showException(exception) {
                this.exception = exception
                this.dialogExceptionVisible = true
            }
        },
        watch: {}
    }
</script>

<style lang="less">
</style>
