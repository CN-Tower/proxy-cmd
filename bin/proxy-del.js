#!/usr/bin/env node

const os = require('os')
const { execSync } = require('child_process')
const { writeFileSync, readFileSync, ensureFileSync } = require('fs-extra')
const { join } = require('path')
const chalk = require('chalk')

if (os.platform() === 'win32') {
  execSync(`setx HTTP_PROXY "" /M`)
  execSync(`setx HTTPS_PROXY "" /M`)
}
else if (os.platform() === 'darwin') {
  const rcFile = join(process.HOME, '.zshrc')
  ensureFileSync(rcFile)
  const rc = readFileSync(rcFile, 'utf-8')
  if (rc.match(/HTTP_PROXY|HTTPS_PROXY/)) {
    writeFileSync(rcFile, rc.replace(/^\s*(HTTPS?_PROXY\s*=\s*.*)/mg, '# $1'))
    execSync(`source ${rcFile}`)
  }
}
console.log(chalk.green(`Success del proxy env`))
