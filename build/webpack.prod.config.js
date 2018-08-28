const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.config')
const SshWebpackPlugin = require('ssh-webpack-plugin');
const merge = require('webpack-merge')

const www = '/app/www/htdocs/hupubao-manager'
const wwwFiles = www + '/*'

const devWebpackConfig = merge(baseWebpackConfig, {

    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/prod.env')
        }),
        new SshWebpackPlugin({
            host: 'puyixiaowo.win',
            port: '22',
            username: 'root',
            privateKey: require('fs').readFileSync('E:/huangfeihong/id_rsa_2048_hupubao'),
            from: 'dist',
            to: www,//important: If the 'cover' of value is false,All files in this folder will be cleared before starting deployment.
            max_buffer: 5000 * 1024,
            before: ['rm -rf ' + wwwFiles],
            after: ['chmod 755 ' + wwwFiles]
        })
    ]
})

module.exports = devWebpackConfig