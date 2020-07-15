
const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const PurifyCSSWebpack = require('purifycss-webpack');
const glob = require('glob');

const rulesConfig = require('./webpack.rules.js');
const show = require('./modules/test.js');
console.log(show());
const jsonConfig = require("./webpack.config.json");
const CopyWebpackPlugin = require('copy-webpack-plugin');

//方式二  避免出现代码冗余
const webpack =require("webpack");



module.exports  = {
    entry:{
        entryKey:["./src/index.js","./src/index2.js"]
        // index:["./src/index.js","./src/text.js"],
        // index2:"./src/index2.js"
    },
    output:{
        // path:__dirname+"/dist/",
        path:path.resolve(__dirname,"dist"),
        filename:"bundle.js"
        // filename:"[name].js"
    },
    optimization:{
        splitChunks:{
            cacheGroups:{
                vender:{
                    chunks:"all",
                    name:"jquery",
                    enforce:true
                }
            }
        }
    },
    module:rulesConfig,

    plugins:[
        new htmlWebpackPlugin({
            // filename:'index.html',//指定html页面
            // chunks:['index'],//指定html页面需要引入的文件（对应entry中的key名）
            template:'./src/index.html',
            title:"我是标题",
            hash:true,
            minify:{
				collapseWhitespace:true,//折叠空白区域（去空格换行等）
				removeAttributeQuotes:true//去掉包括属性值的引号
			},
        }),
        new CleanWebpackPlugin(),//自动删除dist
        new PurifyCSSWebpack({
			paths:glob.sync(path.join(__dirname,'src/*.html'))//将src下所有的html页面中使用到的css利用glob同步逐级筛选出来进行打包，没用到的剔除
		}),
        new CopyWebpackPlugin([
			{
				from:path.resolve(__dirname,'src/assets/'),
				to:'../public/'//该路径相对于dist文件夹而言 静态资源文件输出
			}
        ]),   
        new webpack.ProvidePlugin({
            $:'jquery'
        })
    
        // new htmlWebpackPlugin({   //多爷们输出
        //     filename:'index2.html',//指定html页面
        //     chunks:['index2'],//指定html页面需要引入的文件（对应entry中的key名）
        //     template:'./src/index.html',
        //     title:"我是标题",
        //     hash:true,
        //     minify:{
		// 		collapseWhitespace:true,//折叠空白区域（去空格换行等）
		// 		removeAttributeQuotes:true//去掉包括属性值的引号
		// 	   },
        // })
    ],
    devServer:{
        contentBase: path.join(__dirname,"dist"),//path.join做简单的路径拼接
        host:jsonConfig.host, //服务器地址，localhost
        compress: jsonConfig.compress,//一切服务都启用gzip压缩
        port: jsonConfig.port,//端口号，如果deserver的配置没问题，但是项目启动失败了，需要注意该端口号是否被占用
        open:jsonConfig.open,//浏览器自动打开  
    }
}