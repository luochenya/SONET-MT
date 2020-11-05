module.exports = {
  // 基本路径
  publicPath: "./", // 构建时的输出目录
  outputDir: "dist", // 放置静态资源的目录
  assetsDir: "static", // html 的输出路径
  indexPath: "index.html", //文件名哈希
  filenameHashing: true,
  // 页面title
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "SO-NET";
      return args;
    });
  },
  devServer: {
    host: "0.0.0.0", //指定使用一个 host。默认是 localhost，这里默认值即可
    port: 8080, //指定端口
    proxy: {
      // 请求代理服务器
      "/api": {
        //带上api前缀的
        target: "https://sonet.afenx.cn", //代理目标地址
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          // 在发出请求后将/api替换为''空值，这样不影响接口请求
          "^/api": ""
        }
      }
    },
    overlay: {
      warnings: false,
      errors: false
    }
  },
  lintOnSave: false
};
