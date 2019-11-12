const shell = require('shelljs')
const rimraf = require('rimraf')

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git')
  shell.exit(1)
}

const argv = Array.from(process.argv)
  .slice(2)
  .find(item => {
    return item === 'init'
  })

function genApi() {
  rimraf.sync('./src/api/modules/*')
  const apiPath = 'api/xjy/module/studenttask/studenttask.api'
  const apiExecution = `api/script/goctl api ts -api ${apiPath} -dir src/api/modules -webapi @/api/api`
  shell.exec(apiExecution)
}

if (argv) {
  shell.exec('git init')
  shell.exec('git submodule add git@47.97.170.255:xiao/api.git')
  genApi()
} else {
  shell.cd('./api')
  shell.exec('git checkout master')
  shell.exec('git pull origin master')
  shell.cd('../')
  genApi()
}
