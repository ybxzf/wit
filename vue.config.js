module.exports = {
  lintOnSave: true,
  devServer: {
    disableHostCheck: true,
    host: "0.0.0.0",
    port: 8181,
    proxy: {
      "/base": {
        target: "http://47.108.165.207:20088/api",
        changeOrigin: true,
        pathRewrite: {
          "^/base": "", //规定请求地址以什么作为开头
        },
      },
    },
  },
  configureWebpack: { //这个是配置
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto"
        }
      ]
    }
  },
};
