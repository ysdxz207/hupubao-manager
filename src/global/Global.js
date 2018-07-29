
const PageInfo = {
    pageCurrent: 1,
    pageSize: 10
}

const Login = {
    captcha: {
        service: 'captcha.create'
    },
    login: {
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
    category: {
        name: 'blog.category',
        service: 'category.list'
    },
    tag: {
        name: 'blog.tag',
        service: 'tag.list'
    }
}



export default {
    PageInfo,
    Login,
    Menu,
    Blog
}
