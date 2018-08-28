const resolve = require('path').resolve
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const publicPath = ''

const dev = process.env.NODE_ENV === 'development'

let webpackConfig = {
    entry: {
        vendor: './src/vendor',
        index: './src/main.js'
    },
    output: {
        path: resolve('dist'),
        filename: dev ? '[name].js' : '[name].js?[hash]',
        chunkFilename: '[id].js?[hash]',
        publicPath: dev ? '/assets/' : publicPath
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10,
                    enforce: true
                }
            }
        }
    },
    performance: {
        hints: "warning", // 枚举
        maxAssetSize: 300000, // 整数类型（以字节为单位）
        maxEntrypointSize: 500000, // 整数类型（以字节为单位）
        assetFilter: function (assetFilename) {
            // 提供资源文件名的断言函数
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.less') || assetFilename.endsWith('.js');

        }
    },
    plugins: [
        new VueLoaderPlugin(),
        // new webpack.DefinePlugin({
        //     'process.env': require('./config/dev.env')
        // }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    resolve: {
        alias: {
            '~': resolve('src')
        },
        extensions: ['.js', '.vue', '.json', '.css']
    },
    externals: {
        'vue': 'Vue',
        'element-ui': 'ELEMENT',
        'vue-router': 'VueRouter',
        'axios': 'axios'

    }
}


module.exports = webpackConfig