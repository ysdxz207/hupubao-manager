const webpack = require('webpack')
const url = require('url')
const publicPath = ''
const baseWebpackConfig = require('./webpack.base.config')
const merge = require('webpack-merge')

const dev = process.env.NODE_ENV === 'development'


const devWebpackConfig = merge(baseWebpackConfig, {

    devServer: {
        host: '127.0.0.1',
        port: 8010,
        historyApiFallback: {
            index: url.parse(dev ? '/assets/' : publicPath).pathname
        }
    },
    devtool: dev ? '#eval-source-map' : '#source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        })
    ]
})

module.exports = devWebpackConfig