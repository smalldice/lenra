const GenerateAssetPlugin = require('generate-asset-webpack-plugin')
const config = require('../config.json')
const createJson = compilation => {
  return JSON.stringify(config)
}

const copyJson = config => {
  config.plugins.push(
    new GenerateAssetPlugin({
      filename: 'config.json',
      fn: (compilation, cb) => {
        cb(null, createJson(compilation))
      }
    })
  )
}

module.exports = {
  copyJson
}
