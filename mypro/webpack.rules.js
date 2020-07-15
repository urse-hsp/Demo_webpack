const rules = {
    rules:[
        {
            //style-loader css-loader
            test:/\.css$/,
            use:['style-loader','css-loader']
        },
        {
            test:/\.less$/,
            use:['style-loader','css-loader','less-loader']
        },
        {
            test:/\.(sass|scss)$/,
            use:['style-loader','css-loader','sass-loader']
        },
        {
            test:/\.(gif|png|jpg)$/,
            // use:['url-loader']
            use:[
                {
                    loader:'url-loader',//url-loader依赖file-loader，所以只引入url-loader即可
                    options:{
                        limit:200 //当图片在50字节内转化base64编码，减少http请求，大于50字节的正常以图片正常加载
                    }
                }
            ]
        }
    ]
}
module.exports = rules;