var path = require("path");
const webpack = require("webpack");
var CompressionWebpackPlugin = require("compression-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        app: "./src/main.js"
    },
    output: {
        path: path.resolve(__dirname, "./wwwroot"),
        filename: "[name].[chunkhash:8].js" //对js添加hash指纹
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    sourceMap: true,
                    loaders: {
                        scss: "style-loader!css-loader!sass-loader",
                        sass: "style-loader!css-loader!sass-loader?indentedSyntax"
                    }
                }
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.less/,
                loader: "style!css!autoprefixer!less"
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader"
            }
        ]
    },
    //devtool: "#source-map",
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                //注意一个单引号一个双引号…… 这里是要将 "production" 替换到文件里面
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            comments: false, //去掉注释
            compress: {
                warnings: false //忽略警告,要不然会有一大堆的黄色字体出现……
            }
        }),
        //根据模板自动生成 'Index.cshtml' 文件，并且将带有hash指纹的js打入到html中
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, './Views/Home/Index.cshtml'), //生成的文件，从 output.path 开始 output.path + "/react.html"
            template: 'index.cshtml', //读取的模板文件,这个路径是相对于当前这个配置文件的
            inject: false, // 自动注入
            hash: true,
            minify: {
                removeComments: true, //去注释
                collapseWhitespace: true, //压缩空格
                // removeAttributeQuotes: true //去除属性引用
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            }
        })
    ]
};