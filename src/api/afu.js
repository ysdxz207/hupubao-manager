import request from '~/utils/request'
import Global from '~/global/Global'

const afu = {}

afu.getAfus = function(params) {
    return request({
        data: {
            service: Global.Afu.list.service,
            bizContent: params
        }
    })
}

afu.deleteAfu = function (tag) {
    return request({
        data: {
            service: Global.Afu.delete.service,
            bizContent: tag
        }
    })
}

afu.editAfu = function (afu) {
    return request({
        data: {
            service: Global.Afu.edit.service,
            bizContent: afu
        }
    })
}

export default afu;
