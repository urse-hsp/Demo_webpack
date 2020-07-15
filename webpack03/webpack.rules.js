const rules = {//模块，这里配置loader
		rules:[//配置文件解析规则
			//项目中引入css文件的转化器配置：style-loader  css-loader
			{
				test:/\.css$/,//匹配以.css结尾的文件
				use:['style-loader','css-loader']
			},
			//项目中引入less文件的转化器配置：style-loader  css-loader less-loader；另外需要安装less
			{
				test:/\.less$/, //匹配以.less结尾的文件
				use:['style-loader','css-loader','less-loader']
			},
			//项目中引入sass文件的转化器配置：style-loader  css-loader less-loader；另外需要安装node-sass sass fibers
			{
				test:/\.(sass|scss)$/,
				use:['style-loader','css-loader','sass-loader']
			},
			{//项目中引入图片文件的转化器配置：file-loader url-loader
				test:/\.(gif|png|jpg)$/,
				// use:['url-loader']//url-loader依赖于file-loader，所以需要同时安装
				use:[
					{
						loader:'url-loader',
						options:{
							limit:200 //200:字节，当图片在200字节内的转化为base64编码，减少http请求，大于200字节的正常以图片形式加载即可
						}
					}
				]
			}
		]
	}
module.exports = rules;