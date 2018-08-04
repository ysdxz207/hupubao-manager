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

afu.getAfuDetail = function(id) {
    return request({
        data: {
            service: Global.Afu.detail.service,
            bizContent: {
                id
            }
        }
    })
}

afu.deleteAfu = function (id) {
    return request({
        data: {
            service: Global.Afu.delete.service,
            bizContent: {
                id
            }
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

afu.getAfuTypes = function(params) {
    return request({
        data: {
            service: Global.Afu.type.service,
            bizContent: params
        }
    })
}


afu.getAfuTypeDetail = function(id) {
    return request({
        data: {
            service: Global.Afu.type.detail.service,
            bizContent: {
                id
            }
        }
    })
}

afu.editAfuType = function(params) {
    return request({
        data: {
            service: Global.Afu.type.edit.service,
            bizContent: params
        }
    })
}

afu.deleteAfuType = function(id) {
    return request({
        data: {
            service: Global.Afu.type.delete.service,
            bizContent: {
                id
            }
        }
    })
}
export default afu;
