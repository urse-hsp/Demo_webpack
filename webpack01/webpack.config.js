//引入path模块，nodejs中的系统模块
const path = require('path');
//引入html-webpack-plugin插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//引入clean-webpack-plugion插件：每次打包时自动删除老的dist文件夹
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


// console.log("__dirname="+__dirname);

//引入exports模块
module.exports = {
	//入口
	entry:{
		// entryKey:"./src/index.js"//单入口单出口
		// entryKey:["./src/index.js","./src/index2.js"]//多入口单出口配置，打包顺序即是数组顺序
		index:['./src/index.js','./src/test.js'],//多入口多出口
		index2: './src/index2.js'//多入口多出口
	},
	//出口
	output:{
		path:path.resolve(__dirname,"dist"),//__dirname是nodejs系统模块，用于表示当前文件的绝对路径
		// filename:'bundle.js'//单出口
		filename:"[name].bundle.js"//多出口
	},
	//plugins
	plugins:[
		// new HtmlWebpackPlugin({
		// 	minify:{		// 		collapseWhitespace:true,//折叠空白区域（去空格换行等）		// 		removeAttributeQuotes:true//去掉包括属性值的引号		// 	},//压缩html
		// 	hash:true,//改变每次编译后引用生成的文件路径用于清除浏览器缓存
		// 	title:'我是指定的标题',
		// 	template:'./src/index.html'
		// })
		
		//多页面多引用
		new HtmlWebpackPlugin({
			filename:'index.html',//打包后生成在dist下的html页面名字
			chunks:['index'],//chunks指定html引入的文件，index是entry中的key
			title:'index.html',//打包后的html的title
			template:'./src/index.html'//html模版
		}),
		new HtmlWebpackPlugin({
			filename:'index2.html',
			chunks:['index2'],
			title:'index2.html',
			template:'./src/index2.html'
		}),
		new CleanWebpackPlugin()
	],
	//loaders 遵循moudle.rules规则
	// moudle:{},
	
	//开发服务器
	// devServer:{}
}