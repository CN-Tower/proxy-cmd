#!/usr/bin/env node

import { execSync } from 'child_process'
import { join } from 'path'
import {
  copyFileSync,
  ensureDirSync,
  ensureFileSync,
  writeFileSync,
  existsSync,
  readFileSync,
  removeSync,
} from 'fs-extra'
import os from 'os'
import chalk from 'chalk'

const proxyCmd = join(os.homedir(), 'proxy-cmd')
ensureDirSync(proxyCmd)
const proxyUrl = join(proxyCmd, '.proxy-url')
ensureFileSync(proxyUrl)

let purl = readFileSync(proxyUrl, 'utf-8')
let [x, cmd, url] = process.argv
if (x === 'proxy-url') url = cmd
if (url && url.match(/^https?:\/\/[\d.:]+$/gm)) {
  writeFileSync(proxyUrl, url)
  purl = url
  console.log(`Proxy url set to: ${chalk.cyan(url)}`)
}

// Windows
if (os.platform() === 'win32') {
  // Set PROXY_URL
  try {
    execSync(`setx PROXY_URL "${purl}" /M`, { stdio: 'inherit' })
  } catch {}
  // Set alias
  const alaisBat = join(proxyCmd, 'alais.bat')
  if (existsSync(alaisBat)) removeSync(alaisBat)
  copyFileSync(join(__dirname, 'alais.bat'), alaisBat)
  try {
    execSync(
      `REG add "HKEY_CURRENT_USER\\Software\\Microsoft\\Command Processor" /v AutoRun /t REG_SZ /d "${alaisBat}" /f`,
      { stdio: 'inherit' }
    )
  } catch {}
}
// MacOS
else if (os.platform() === 'darwin') {
  const rcFile = join(os.homedir(), '.zshrc')
  ensureFileSync(rcFile)
  let rcTpl = readFileSync(rcFile, 'utf-8')
  // Set PROXY_URL
  if (rcTpl.match(/^\s*PROXY_URL\s*=.*$/gm)) {
    rcTpl = rcTpl.replace(/^\s*PROXY_URL\s*=.*$/gm, `PROXY_URL='${purl}'`)
  } else {
    rcTpl = `${rcTpl}\nPROXY_URL='${purl}'`
  }
  // Set alias proxy-on
  const cmdOn = `alias proxy-on="export HTTP_PROXY='$PROXY_URL' && export HTTPS_PROXY='$PROXY_URL'"`
  if (rcTpl.match(/^\s*alias proxy-on/gm)) {
    rcTpl = rcTpl.replace(/^\s*alias proxy-on.*$/gm, cmdOn)
  } else {
    rcTpl = `${rcTpl}\n${cmdOn}`
  }
  // Set alias proxy-off
  const cmdOff = `alias proxy-off="unset HTTP_PROXY && unset HTTPS_PROXY"`
  if (rcTpl.match(/^\s*alias proxy-off/gm)) {
    rcTpl = rcTpl.replace(/^\s*alias proxy-off.*$/gm, cmdOff)
  } else {
    rcTpl = `${rcTpl}\n${cmdOff}`
  }
  writeFileSync(rcFile, rcTpl)
  execSync(`source ${rcFile}`, { stdio: 'inherit' })
}

console.log(
  chalk.green(`proxy-cmd inited, restart your terminal and run \`proxy-on\` or \`proxy-off\` to switch proxy`)
)
