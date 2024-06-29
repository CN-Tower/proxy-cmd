#!/usr/bin/env node

const os = require('os')
const { execSync } = require('child_process')
const { writeFileSync, existsSync, readFileSync, ensureFileSync } = require('fs-extra')
const { join } = require('path')
const chalk = require('chalk')

const proxyConf = join(__dirname, '.proxy')
const proxyUrl = readFileSync(proxyConf, 'utf-8')

if (proxyUrl) {
  if (os.platform() === 'win32') {
    execSync(`setx HTTP_PROXY "${proxyUrl}" /M`)
    execSync(`setx HTTPS_PROXY "${proxyUrl}" /M`)
  } else if (os.platform() === 'darwin') {
    const rcFile = join(process.HOME, '.zshrc')
    ensureFileSync(rcFile)
    const rc = readFileSync(rcFile, 'utf-8')
    if (rc.match(/HTTP_PROXY|HTTPS_PROXY/)) {
      writeFileSync(rcFile, rc.replace(/^\s*#\s*(HTTPS?_PROXY)\s*=\s*.*/mg, `$1="${proxyUrl}"`))
    } else {
      writeFileSync(rcFile, `${rc}\nHTTP_PROXY="${proxyUrl}"\nHTTP_PROXY="${proxyUrl}"`)
    }
    execSync(`source ${rcFile}`)
  }
  console.log(chalk.green(`Success set proxy env to: ${proxyUrl}`))
} else {
  console.log(chalk.red('Plese set proxy url first, run: `proxy-url http://proxy-ip:port`'))
}