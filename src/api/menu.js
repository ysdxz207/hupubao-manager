import request from '~/utils/request'
import Global from '~/global/Global'

const menu = {}

menu.getMenuTypes = function () {
    return request({
        data: {
            service: Global.Menu.types.service,
            bizContent: {}
        }
    })
}

menu.getMenuNav = function (type) {
    return request({
        data: {
            service: Global.Menu.nav.service,
            bizContent: {type: type}
        }
    })
}

export default menu;
