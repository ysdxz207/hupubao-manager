
const PageInfo = {
    pageNum: 1,
    pageSize: 10
}

const Login = {
    captcha: {
        service: 'captcha.create'
    },
    login: {
        name: 'user.login',
        service: 'user.login'
    },
    logout: {
        name: 'user.logout',
        service: 'user.logout'
    }
}

const Main = {
    dashbord: {
        name: 'dashbord'
    }
}

const Blog = {
    article: {
        name: 'blog.article',
        service: 'article.list'
    },
    articleDetail: {
        service: 'article.detail'
    },
    articleEdit: {
        name: 'blog.article.edit',
        service: 'article.edit'
    },
    articleDelete: {
        service: 'article.delete'
    },
    category: {
        name: 'blog.category',
        service: 'category.list'
    },
    categoryDelete: {
        service: 'category.delete'
    },
    categoryEdit: {
        service: 'category.edit'
    },
    tag: {
        name: 'blog.tag',
        service: 'tag.list'
    },
    tagDelete: {
        service: 'tag.delete'
    },
    tagEdit: {
        service: 'tag.edit'
    },
}

const Image = {
    upload: {
        service: 'image.upload'
    }
}

const Utils = function () {
    Array.prototype.remove = function (item) {
        let index = this.indexOf(item)
        if (index > -1) {
            this.slice(index, 1)
        }
    }
}

const Afu = {
    list: {
        name: 'afu',
        service: 'afu.list'
    },
    detail: {
        service: 'afu.detail'
    },
    delete: {
        service: 'afu.delete'
    },
    edit: {
        name: 'afu.edit',
        service: 'afu.edit'
    },
    type: {
        name: 'afu.type',
        service: 'afuType.list',
        detail: {
            name: 'afu.type.detail',
            service: 'afuType.detail'
        },
        edit: {
            name: 'afu.type.edit',
            service: 'afuType.edit'
        },
        delete: {
            service: 'afuType.delete'
        }
    }
}

const Access = {
    user: {
        list: {
            name: 'access.user',
            service: 'user.list'
        },
        detail: {
            service: 'user.detail'
        },
        delete: {
            service: 'user.delete'
        },
        edit: {
            name: 'access.user.edit',
            service: 'user.edit'
        }
    },
    role: {
        list: {
            name: 'access.role',
            service: 'role.list'
        },
        detail: {
            service: 'role.detail'
        },
        delete: {
            service: 'role.delete'
        },
        edit: {
            name: 'access.role.edit',
            service: 'role.edit'
        },
        permissions: {
            name: 'access.role.permission',
            service: 'role.permissions'
        },
    },
    menu: {
        list: {
            name: 'access.menu',
            service: 'menu.list'
        },
        delete: {
            service: 'menu.delete'
        },
        edit: {
            name: 'access.menu.edit',
            service: 'menu.edit'
        },
        types: {
            service: 'menu.type'
        },
        nav: {
            service: 'menu.nav'
        }
    },
    permission: {
        list: {
            name: 'access.permission',
            service: 'permission.list'
        },
        delete: {
            service: 'permission.delete'
        },
        edit: {
            name: 'access.permission.edit',
            service: 'permission.edit'
        },
        tree: {
            name: 'access.role.permission',
            service: 'permission.tree'
        }
    }
}

const Logging = {
    list: {
        name: 'logging',
        service: 'logging.list'
    },
    detail: {
        service: 'logging.detail'
    }
}
export default {
    Utils,
    Main,
    PageInfo,
    Login,
    Blog,
    Image,
    Afu,
    Access,
    Logging
}
