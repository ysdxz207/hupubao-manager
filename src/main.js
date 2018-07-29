import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import './assets/icon/iconfont.css'
import Global from '~/global/Global'


const Index = () => import('./components/Index.vue').then(m => m.default)
const Dashbord = () => import('./components/Dashbord.vue').then(m => m.default)
const Pager = () => import('./components/Pager.vue').then(m => m.default)
const Login = () => import('./components/Login.vue').then(m => m.default)
const Register = () => import('./components/Register.vue').then(m => m.default)
const Article = () => import('./components/blog/Article.vue').then(m => m.default)
const ArticleEdit = () => import('./components/blog/ArticleEdit.vue').then(m => m.default)
const ArticleCategory = () => import('./components/blog/Category.vue').then(m => m.default)
const ArticleTag = () => import('./components/blog/Tag.vue').then(m => m.default)
const AccessUser = () => import('./components/permission/AccessUser.vue').then(m => m.default)
const AccessRole = () => import('./components/permission/AccessRole.vue').then(m => m.default)
const AccessMenu = () => import('./components/permission/AccessMenu.vue').then(m => m.default)
const AccessPermissions = () => import('./components/permission/AccessPermissions.vue').then(m => m.default)
const Afu = () => import('./components/afu/Afu.vue').then(m => m.default)
const AfuType = () => import('./components/afu/AfuType.vue').then(m => m.default)
const SearchArticle = () => import('./components/search/blog/SearchArticle.vue').then(m => m.default)
const Breadcrumb = () => import('./components/Breadcrumb.vue').then(m => m.default)


Vue.use(VueRouter)
Vue.use(ElementUI)

Vue.prototype.Constants = Global

const routes = [
    {
        name: 'dashbord',
        path: '/',
        component: Index,
        children: [
            {
                path: '', component: Dashbord
            }
        ]
    },
    {
        name: 'blog',
        path: '/blog',
        component: Index,
        children: [
            {
                name: Global.Blog.article.name,
                path: 'article', components: {
                    default: Article,
                    toolbar: SearchArticle,
                    breadcrumb: Breadcrumb,
                    pager: Pager
                }
            },
            {
                name: Global.Blog.articleEdit.name,
                path: 'article/edit', components: {
                    default: ArticleEdit,
                    breadcrumb: Breadcrumb
                }
            },
            {
                name: Global.Blog.category.name,
                path: 'category', components: {
                    default: ArticleCategory,
                    // toolbar: SearchArticle,
                    breadcrumb: Breadcrumb,
                    pager: Pager
                }
            },
            {
                name: Global.Blog.tag.name,
                path: 'tag', components: {
                    default: ArticleTag,
                    // toolbar: SearchArticle,
                    breadcrumb: Breadcrumb,
                    pager: Pager
                }
            }
        ]
    },
    {
        path: '/access',
        component: Index,
        children: [
            {path: 'user', component: AccessUser},
            {path: 'role', component: AccessRole},
            {path: 'menu', component: AccessMenu},
            {path: 'permissions', component: AccessPermissions}
        ]
    },
    {
        path: '/afu',
        component: Index,
        children: [
            {path: '/', component: Afu},
            {path: 'type', component: AfuType}
        ]
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'register',
        path: '/register',
        component: Register
    }]

const router = new VueRouter({
    routes
})

//路由拦截

const whiteList = ['/login', '/register']; // 不重定向白名单
router.beforeEach((to, from, next) => {

    if (whiteList.indexOf(to.path) !== -1) {
        next();
    } else {
        if (sessionStorage.getItem("token")) {
            next();
            //

        } else {
            next({path: '/login'});
            //
        }
    }
})

router.afterEach(() => {

})


new Vue({
    router,
    render: h => h(App)
}).$mount('#app-box')

Vue.prototype.bus = new Vue()