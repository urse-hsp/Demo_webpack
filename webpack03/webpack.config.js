//引入path模块，nodejs中的系统模块
const path = require('path');
//引入html-webpack-plugin插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//引入clean-webpack-plugion插件：每次打包时自动删除老的dist文件夹
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

//引入purifycss-webpack 剔除类似bootstrap等框架中冗余代码
const PurifyCSSWebpack = require('purifycss-webpack');
//引入glob 用于逐级筛选
const glob = require('glob');

//引入module.rules webpack模块化配置
const rulesConfig = require('./webpack.rules.js');

//引入外模块
const show = require('./modules/test.js');
console.log(show());
// console.log("__dirname="+__dirname);

//引入json配置文件
const serverConfig = require('./webpack.server.config.json');

//引入copy-webpack-plugin插件：将项目中的静态文件打包时自动复制到指定位置
const CopyWebpackPlugin = require('copy-webpack-plugin');

//引入webpack，第三方库jquery引入的第二种方式
const webpack = require('webpack');

//引入exports模块
module.exports = {
	//入口
	entry:{
		entryKey:"./src/index.js"//单入口单出口
		// entryKey:["./src/index.js","./src/index2.js"]//多入口单出口配置，打包顺序即是数组顺序
		// index:['./src/index.js','./src/test.js'],//多入口多出口
		// index2: './src/index2.js'//多入口多出口
	},
	//出口
	output:{
		path:path.resolve(__dirname,"dist"),//__dirname是nodejs系统模块，用于表示当前文件的绝对路径；path.resolve()先进行路径拼接，之后执行cmd的cd操作进入到该路径下
		filename:'bundle.js'//单出口
		// filename:"[name].bundle.js"//多出口
	},
	//单入口单出口项目中将第三方库与其他js拆分：optimization.splitChunks(webpack自带)
	optimization:{
		splitChunks:{
			cacheGroups:{
				vender:{//该键名为自定义
					chunks:'all',//all|async|initial 生产环境build的时候需要配置为all，dev环境配置为async
					name:'jquery',
					enforce:true//强制分离，可不写
				},
				//如果需要分离多个第三方库可在下面继续添加
				// vender2:{
				// 	...
				// }
			}
		}
	},
	
	
	
	//plugins
	plugins:[
		new HtmlWebpackPlugin({
			minify:{
				collapseWhitespace:true,//折叠空白区域（去空格换行等）
				removeAttributeQuotes:true//去掉包括属性值的引号
			},//压缩html
			hash:true,//改变每次编译后引用生成的文件路径用于清除浏览器缓存
			title:'我是指定的标题',
			template:'./src/index.html'
		}),
		
		//多页面多引用
		// new HtmlWebpackPlugin({
		// 	filename:'index.html',//打包后生成在dist下的html页面名字
		// 	chunks:['index'],//chunks指定html引入的文件，index是entry中的key
		// 	title:'index.html',//打包后的html的title
		// 	template:'./src/index.html'//html模版
		// }),
		// new HtmlWebpackPlugin({
		// 	filename:'index2.html',
		// 	chunks:['index2'],
		// 	title:'index2.html',
		// 	template:'./src/index2.html'
		// }),
		new CleanWebpackPlugin(),
		new PurifyCSSWebpack({
			paths:glob.sync(path.join(__dirname,'src/*.html'))//将src下所有的html页面中使用到的css利用glob同步逐级筛选出来进行打包，没用到的剔除
		}),
		new CopyWebpackPlugin([
			{
				from:path.resolve(__dirname,'src/assets/'),
				to:'../public/'//该路径相对于dist文件夹而言
			}
		]),
		//jquery引入的第二种方式
		new webpack.ProvidePlugin({
			$:'jquery'
		})
	],
	/* ============ */
	//loaders 遵循module.rules规则
	module:rulesConfig,
	
	/* ============ */
	//开发服务器
	devServer:{
		contentBase:path.join(__dirname,'dist'),//设置服务器访问的基本目录；path.join()做简单的路径拼接；
		host:serverConfig.host,//服务器地址
		port:serverConfig.port,//端口号
		compress:serverConfig.compress,//一切服务器启用gzip压缩
		open:serverConfig.open,//浏览器自动打开
		hot:serverConfig.hot//是否热更新（代码修改保存后浏览器自动刷新），webpack4之前需要配置，4之后为了弱化webpack配置不需要配
	}
}