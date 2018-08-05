import request from '~/utils/request'
import Global from '~/global/Global'

const access = {}

access.user = {
    getUsers: function (params) {
        return request({
            data: {
                service: Global.Access.user.list.service,
                bizContent: params
            }
        })
    },
    getUserDetail: function(id) {
        return request({
            data: {
                service: Global.Access.user.detail.service,
                bizContent: {
                    id
                }
            }
        })
    },
    getUserDetail: function(id) {
        return request({
            data: {
                service: Global.Access.user.detail.service,
                bizContent: {
                    id
                }
            }
        })
    },
    deleteUser: function (id) {
        return request({
            data: {
                service: Global.Access.user.delete.service,
                bizContent: {
                    id
                }
            }
        })
    },
    editUser: function (user) {
        return request({
            data: {
                service: Global.Access.user.edit.service,
                bizContent: user
            }
        })
    }

}

access.role = {
    getRoles: function(params) {
        return request({
            data: {
                service: Global.Access.role.list.service,
                bizContent: params
            }
        })
    },
    getRoleDetail: function(id) {
        return request({
            data: {
                service: Global.Access.role.detail.service,
                bizContent: {
                    id
                }
            }
        })
    },
    deleteRole: function (id) {
        return request({
            data: {
                service: Global.Access.role.delete.service,
                bizContent: {
                    id
                }
            }
        })
    },
    editRole: function (role) {
        return request({
            data: {
                service: Global.Access.role.edit.service,
                bizContent: role
            }
        })
    }
}

access.menu = {
    getMenuTypes: function () {
        return request({
            data: {
                service: Global.Menu.types.service,
                bizContent: {}
            }
        })
    },
    getMenuNav: function (type) {
        return request({
            data: {
                service: Global.Menu.nav.service,
                bizContent: {type: type}
            }
        })
    }
}

access.permission = {
    getValidatePermissionList: function () {
        return request({
            data: {
                service: Global.Access.permission.validateList.service,
                bizContent: {
                }
            }
        })
    },
    getPermissions: function (params) {
        return request({
            data: {
                service: Global.Access.permission.list.service,
                bizContent: {
                    params
                }
            }
        })
    },
    deletePermission: function (id) {
        return request({
            data: {
                service: Global.Access.permission.delete.service,
                bizContent: {
                    id
                }
            }
        })
    },
    editPermission: function (permission) {
        return request({
            data: {
                service: Global.Access.permission.edit.service,
                bizContent: permission
            }
        })
    }
}

export default access;
