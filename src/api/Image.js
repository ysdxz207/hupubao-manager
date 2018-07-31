import request from '~/utils/request'
import Global from '~/global/Global'

const image = {}

image.upload = function($file) {
    return request({
        data: {
            service: Global.Image.upload.service,
            bizContent: {
                base64: $file.miniurl,
                name: $file.name
            }
        }
    })
}

export default image;
