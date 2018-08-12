import request from '~/utils/request'
import Global from '~/global/Global'

const logging = {}

logging.getLoggings = function(params) {
    return request({
        data: {
            service: Global.Logging.list.service,
            bizContent: params
        }
    })
}

logging.getLoggingDetail = function(id) {
    return request({
        data: {
            service: Global.Logging.detail.service,
            bizContent: {
                id
            }
        }
    })
}
export default logging;
