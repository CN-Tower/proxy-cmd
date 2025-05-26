#!/usr/bin/env node

import { join, basename } from 'path'
import { ensureFileSync, readFileSync } from 'fs-extra'
import { proxyUrl } from './proxy-url'
import os from 'os'
import chalk from 'chalk'

/**
 * Set or show proxy port
 */
export const proxyPort = () => {
  const proxyCmd = join(os.homedir(), 'proxy-cmd')
  const pxUrlFile = join(proxyCmd, '.proxy-url')
  ensureFileSync(pxUrlFile)
  
  let [x, cmd, p, port] = process.argv
  x = basename(x)
  if (x === 'proxy-cmd' || x === 'proxy') port = p

  // Set proxy url port
  if (port && port.match(/^\d+$/)) {
    let url = readFileSync(pxUrlFile, 'utf-8')
    if (!url) {
      url = `http://127.0.0.1:${port}`
    } else {
      url = url.replace(/:\d+$/, `:${port}`)
    }
    proxyUrl(url)
  }
  // Show current proxy url port
  else {
    const purl = readFileSync(pxUrlFile, 'utf-8')
    console.log(`Current proxy url is: ${chalk.cyan(purl)}`)
  }
}
