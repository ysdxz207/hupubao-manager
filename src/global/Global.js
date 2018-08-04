
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
    }
}

const Menu = {
    types: {
        service: 'menu.type'
    },
    nav: {
        service: 'menu.nav'
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
        service: 'afu.type.list',
        detail: {
            name: 'afu.type.detail',
            service: 'afu.type.detail'
        },
        edit: {
            name: 'afu.type.edit',
            service: 'afu.type.edit'
        },
        delete: {
            service: 'afu.type.delete'
        }
    }
}
export default {
    Utils,
    Main,
    PageInfo,
    Login,
    Menu,
    Blog,
    Image,
    Afu
}
