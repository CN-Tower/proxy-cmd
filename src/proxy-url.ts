#!/usr/bin/env node

import { execSync } from 'child_process'
import { join, basename } from 'path'
import { ensureFileSync, writeFileSync, readFileSync } from 'fs-extra'
import os from 'os'
import chalk from 'chalk'

/**
 * Set or show proxy url
 */
export const proxyUrl = (url = '') => {
  const proxyCmd = join(os.homedir(), 'proxy-cmd')
  const pxUrlFile = join(proxyCmd, '.proxy-url')
  ensureFileSync(pxUrlFile)
  
  // If no url is provided, read from command line arguments
  if (!url) {
    let [x, cmd, u, u2] = process.argv
    x = basename(x)
    if (x === 'proxy-cmd' || x === 'proxy') u2 = u
    url = u2
  }
  // Set proxy url
  if (url && url.match(/^https?:\/\/[\d.:]+$/gm)) {
    writeFileSync(pxUrlFile, url)
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
        if (rcTpl.match(/^\s*#?\s*http_proxy/im)) {
          rcTpl = rcTpl.replace(/^\s*(#?\s*)export http_proxy\s*=\s*.*/img, `$1export http_proxy="${url}"`)
        } else {
          rcTpl = `${rcTpl}\nexport http_proxy="${url}"`
        }
        if (rcTpl.match(/^\s*#?\s*https_proxy/im)) {
          rcTpl = rcTpl.replace(/^\s*(#?\s*)export https_proxy\s*=\s*.*/img, `$1export https_proxy="${url}"`)
        } else {
          rcTpl = `${rcTpl}\nexport https_proxy="${url}"`
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
    const purl = readFileSync(pxUrlFile, 'utf-8')
    console.log(`Current proxy url is: ${chalk.cyan(purl)}`)
  }
}
