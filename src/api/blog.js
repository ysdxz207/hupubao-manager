import request from '~/utils/request'
import Global from '~/global/Global'

const blog = {}

blog.getArticleTags = function(params) {
    return request({
        data: {
            service: Global.Blog.tag.service,
            bizContent: params
        }
    })
}

blog.getArticleCategories = function(params) {
    return request({
        data: {
            service: Global.Blog.category.service,
            bizContent: params
        }
    })
}

blog.getArticles = function(params) {
    return request({
        data: {
            service: Global.Blog.article.service,
            bizContent: params
        }
    })
}

blog.getArticleDetail = function (id) {

    return request({
        data: {
            service: Global.Blog.articleDetail.service,
            bizContent: {id}
        }
    })
}

blog.editArticle = function (article) {

    return request({
        data: {
            service: Global.Blog.articleEdit.service,
            bizContent: article
        }
    })
}

blog.deleteArticle = function (article) {

    return request({
        data: {
            service: Global.Blog.articleDelete.service,
            bizContent: article
        }
    })
}

blog.deleteCategory = function (category) {
    return request({
        data: {
            service: Global.Blog.categoryDelete.service,
            bizContent: category
        }
    })
}

blog.editCategory = function (category) {
    return request({
        data: {
            service: Global.Blog.categoryEdit.service,
            bizContent: category
        }
    })
}

blog.deleteTag = function (tag) {
    return request({
        data: {
            service: Global.Blog.tagDelete.service,
            bizContent: tag
        }
    })
}

blog.editTag = function (tag) {
    return request({
        data: {
            service: Global.Blog.tagEdit.service,
            bizContent: tag
        }
    })
}

export default blog;
