#!/usr/bin/env node

import pkg from '../package.json'
import { program } from 'commander'
import chalk from 'chalk'
import { proxyInit } from './proxy-init'
import { proxyUrl } from './proxy-url'
import { noProxy } from './no-proxy'
import { proxySet } from './proxy-set'
import { proxyDel } from './proxy-del'

const description = `\
  ${chalk.green('Proxy switcher')}
    Init proxy-cmd: ${chalk.cyan('proxy-cmd init')}
    Init proxy-cmd with url: ${chalk.cyan('proxy-cmd init http://ip:port')}
    Set proxy env vars in context process: ${chalk.cyan('proxy-on')}
    Del proxy env vars in context process: ${chalk.cyan('proxy-off')}
    Set global proxy env variables: ${chalk.cyan('proxy-cmd set')}
    Del global proxy env variables: ${chalk.cyan('proxy-cmd del')}
    Set proxy target url: ${chalk.cyan('proxy-cmd url http://ip:port')}
    Show proxy target url: ${chalk.cyan('proxy-cmd url')}
    Set NO_PROXY config: ${chalk.cyan('proxy-cmd np localhost,127.0.0.1')}
    Show NO_PROXY config: ${chalk.cyan('proxy-cmd np')}
    Delte NO_PROXY config: ${chalk.cyan('proxy-cmd np del')}
  
    GitHub：${chalk.cyan('https://github.com/CN-Tower/proxy-cmd')}`

program.version(pkg.version).option('-v, --version', 'output the version number').description(description)

/**
 * Init proxy-cmd
 * eg: proxy-cmd init http://127.0.0.1:8234 localhost,127.0.0.1
 */
program
  .command('init')
  .action(() => proxyInit())
  .description(`Init proxy-cmd: ${chalk.cyan('proxy-cmd init')}`)

/**
 * Set global proxy environments
 */
program
  .command('set')
  .action(() => proxySet())
  .description(`Set global proxy environments: ${chalk.cyan('proxy-cmd set')}`)

/**
 * Del global proxy environments
 */
program
  .command('del')
  .action(() => proxyDel())
  .description(`Del global proxy environments: ${chalk.cyan('proxy-cmd del')}`)

/**
 * Set or show proxy target url
 * eg: proxy-cmd url http://127.0.0.1:8234
 */
program
  .command('url')
  .action(() => proxyUrl())
  .description(`Set or Show proxy target url: ${chalk.cyan('proxy-cmd url http://ip:port')}`)

/**
 * Set or show NO_PROXY config
 * eg: proxy-cmd np localhost,127.0.0.1
 */
program
  .command('np')
  .action(() => noProxy())
  .description(`Set or show NO_PROXY config: ${chalk.cyan('proxy-cmd np localhost,127.0.0.1')}`)

program.parse(process.argv)
