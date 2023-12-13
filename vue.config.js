module.exports = {
  lintOnSave: true,
  devServer: {
    disableHostCheck: true,
    host: "0.0.0.0",
    port: 8181,
    proxy: {
      "/base": {
        target: "http://bianyuan123.gnway.cc/api",
        changeOrigin: true,
        pathRewrite: {
          "^/base": "", //规定请求地址以什么作为开头
        },
      },
    },
  },
};
