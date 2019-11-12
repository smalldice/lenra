const fs = require('fs')
const rimraf = require('rimraf')
const SentryPlugin = require('@sentry/webpack-plugin')
const path = require('path')

const createSentryRelease = () => {
  const packageJsonPath = path.join(__dirname, '../package.json')
  const date = new Date()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const date1 = date
    .getDate()
    .toString()
    .padStart(2, '0')
  const hour = date
    .getHours()
    .toString()
    .padStart(2, '0')
  const minute = date
    .getMinutes()
    .toString()
    .padStart(2, '0')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath))
  const sentryRelease = `${date.getFullYear()}-${month}-${date1},${hour}:${minute}_${
    process.env.VUE_APP_APP_ID
  }`
  packageJson.sentryRelease = sentryRelease
  fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`)

  return sentryRelease
}

const uploadSourceMap = config => {
  const sentryRelease = createSentryRelease()
  const sentryPlugin = new SentryPlugin({
    release: sentryRelease,
    include: `${config.output.path}/js`,
    urlPrefix: '~/js',
    configFile: './config/sentry.properties'
  }) // sentry 插件配置
  const buildDoneHook = {
    apply: compiler => {
      compiler.hooks.done.tap('done', compilation => {
        // 删除 source map
        rimraf.sync('./dist/**/*.map')
        console.info('移除 Source map 完成。\n\n')
      })
    }
  } // 编译完成钩子

  config.plugins.push(sentryPlugin, buildDoneHook)
}

module.exports = uploadSourceMap
