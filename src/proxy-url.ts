#!/usr/bin/env node

import { execSync } from 'child_process'
import { join } from 'path'
import { ensureFileSync, writeFileSync, readFileSync } from 'fs-extra'
import os from 'os'
import chalk from 'chalk'

/**
 * Set or show proxy target url
 */
export const proxyUrl = () => {
  const proxyCmd = join(os.homedir(), 'proxy-cmd')
  const pxUrl = join(proxyCmd, '.proxy-url')
  ensureFileSync(pxUrl)
  
  let [x, cmd, u, url] = process.argv
  if (x === 'proxy-cmd') url = u
  
  // Set proxy url
  if (url && url.match(/^https?:\/\/[\d.:]+$/gm)) {
    writeFileSync(pxUrl, url)
    // Windows
    if (os.platform() === 'win32') {
      // Set PROXY_URL
      try {
        execSync(`setx PROXY_URL "${url}" /M`, { stdio: 'inherit' })
      } catch {}
    }
    // MacOS
    else if (os.platform() === 'darwin') {
      const rcFile = join(os.homedir(), '.zshrc')
      ensureFileSync(rcFile)
      let rcTpl = readFileSync(rcFile, 'utf-8')
      // Set PROXY_URL
      if (rcTpl.match(/^\s*PROXY_URL\s*=.*$/gm)) {
        rcTpl = rcTpl.replace(/^\s*PROXY_URL\s*=.*$/gm, `PROXY_URL='${url}'`)
      } else {
        rcTpl = `${rcTpl}\nPROXY_URL='${url}'`
      }
      if (rcTpl.match(/HTTP_PROXY/)) {
        rcTpl = rcTpl.replace(/^\s*(#?\s*)export HTTP_PROXY\s*=\s*.*/mg, `$1export HTTP_PROXY="${url}"`)
      } else {
        rcTpl = `${rcTpl}\nexport HTTP_PROXY="${url}"`
      }
      if (rcTpl.match(/HTTPS_PROXY/)) {
        rcTpl = rcTpl.replace(/^\s*(#?\s*)export HTTPS_PROXY\s*=\s*.*/mg, `$1export HTTPS_PROXY="${url}"`)
      } else {
        rcTpl = `${rcTpl}\nexport HTTPS_PROXY="${url}"`
      }
      writeFileSync(rcFile, rcTpl)
      execSync(`source ${rcFile}`, { stdio: 'inherit' })
    }
    console.log(`Proxy url set to: ${chalk.cyan(url)}`)
  }
  // Show current proxy url
  else {
    const purl = readFileSync(pxUrl, 'utf-8')
    console.log(`Current proxy url is: ${chalk.cyan(purl)}`)
  }
}
