const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    client: { overlay: false },
    proxy: {
      '/api': {
        // 指定目标服务器地址（例如后台API接口）
        target: 'http://101.37.20.150:8090',

        // 设置为true，允许跨域请求时重写源信息（Origin header）
        changeOrigin: true,

        // 路径重写规则，将前端应用中'/api'前缀去掉，映射到后端服务器的实际路径上
        pathRewrite: { '^/api': '' }
      }
    }
  }
})
