module.exports = {
	lintOnSave: true,
	devServer: {
		proxy: {
			'/base': {
				target:"http://47.108.165.207/api/",
				changeOrigin: true,
				pathRewrite: {
					'^/base': '' //规定请求地址以什么作为开头
				}
			},
		},
	},
}