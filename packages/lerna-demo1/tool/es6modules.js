const chalk = require('chalk')
const acorn = require('acorn')
const path = require('path')
const fs = require('fs')

function es6Modules() {
  const packages = readPackages()

  if (!packages) return []

  return packages.filter(dep => {
    const filePath = require.resolve(dep, { paths: [__dirname] })
    console.log('path', filePath)
    return !isScriptEs5(filePath, dep)
  })
}

function readPackages() {
  const packageJsonPath = path.join(__dirname, '../package.json')
  const packageJson = require(packageJsonPath)

  if (!packageJson) {
    console.log(chalk.red(`Failed to load package.json in ${__dirname}`))
    return null
  }

  return filterVuePackages(Object.keys(packageJson.dependencies))
}

function filterVuePackages(list) {
  const reg = /^vue/

  return list.filter(pkgName => {
    return !reg.test(pkgName)
  })
}

function isScriptEs5(scriptPath, dependencyName) {
  const acornOpts = { ecmaVersion: 5 }
  const code = fs.readFileSync(scriptPath, 'utf8')

  try {
    acorn.parse(code, acornOpts)
  } catch (err) {
    console.log(chalk.red(`❌ ${dependencyName} is not ES5`))
    return false
  }

  console.log(chalk.green(`✅ ${dependencyName} is ES5`))

  return true
}

console.log(chalk.yellow('开始分析依赖项目语法'))

module.exports = es6Modules
