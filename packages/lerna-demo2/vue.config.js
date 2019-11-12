const { copyJson } = require('./tool/copyjson')
const uploadSourceMap = require('./tool/sentry')
const es6Modules = require('./tool/es6modules')
const publicPath = process.env.NODE_ENV !== 'development' ? '././' : ''

const options = {
  publicPath,
  productionSourceMap: process.env.VUE_APP_IS_RELEASE === 'true',
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/variables.scss"; $userSelect: ${process.env.VUE_APP_USER_SELECT || 'none'};`
      }
    }
  },
  configureWebpack: config => {
    config.entry.app = ['./src/main.ts']
    copyJson(config)

    if (process.env.VUE_APP_IS_RELEASE) {
      uploadSourceMap(config)
    }
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .end()
  },
  devServer: {
    proxy: {
      '^/api': {
        target: process.env.VUE_APP_API_DOMAIN,
        changeOrigin: true
      }
    }
  }
}

if (process.env.VUE_APP_IS_RELEASE === 'true') {
  options.transpileDependencies = es6Modules()
}

module.exports = options
