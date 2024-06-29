#!/usr/bin/env node

const { join } = require('path')
const { writeFileSync, existsSync, readFileSync } = require('fs-extra')
const os = require('os')
const chalk = require('chalk')

const proxyConf = join(os.homedir(), '.proxy-cmd')

let [ x, cmd, url ] = process.argv

if (x === 'proxy-url') {
  url = cmd
}
if (url && url.match(/^https?:\/\/[\d.:]+$/)) {
  writeFileSync(proxyConf, url)
  console.log(`Proxy url set to: ${chalk.cyan(url)}`)
} else {
  let purl = ''
  if (existsSync(proxyConf)) {
    purl = readFileSync(proxyConf, 'utf-8')
  }
  console.log(`Current proxy url is: ${chalk.cyan(purl)}`)
}
