const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
      ? '/callboard/'
      : '/',
  devServer: {
    proxy: 'https://localhost:4000'
  }
})
