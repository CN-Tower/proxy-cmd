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
    // MacOS or Linux
    else {
      const wtAliasInRcFile = (rcFile: string) => {
        ensureFileSync(rcFile)
        let rcTpl = readFileSync(rcFile, 'utf-8')
        // Set PROXY_URL
        if (rcTpl.match(/^(export\s*)?PROXY_URL\s*=.*$/gm)) {
          rcTpl = rcTpl.replace(/^(export\s*)?PROXY_URL\s*=.*$/gm, `export PROXY_URL='${url}'`)
        } else {
          rcTpl = `${rcTpl}\nexport PROXY_URL='${url}'`
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
        try {
          execSync(`type srouce > /dev/null 2>&1 && source ${rcFile}`, { stdio: 'inherit' })
        } catch {}
      }
      // MacOS
      if (os.platform() === 'darwin') {
        const zshrc = join(os.homedir(), '.zshrc')
        const bashrc = join(os.homedir(), '.bashrc')
        wtAliasInRcFile(zshrc)
        wtAliasInRcFile(bashrc)
      }
      // Linux
      else {
        const bashrc = join(os.homedir(), '.bashrc')
        wtAliasInRcFile(bashrc)
      }
    }
    console.log(`Proxy url set to: ${chalk.cyan(url)}`)
  }
  // Show current proxy url
  else {
    const purl = readFileSync(pxUrl, 'utf-8')
    console.log(`Current proxy url is: ${chalk.cyan(purl)}`)
  }
}
