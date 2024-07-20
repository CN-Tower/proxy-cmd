#!/usr/bin/env node

import pkg from '../package.json'
import { program } from 'commander'
import chalk from 'chalk'
import { proxyInit } from './proxy-init'
import { proxyUrl } from './proxy-url'
import { proxySet } from './proxy-set'
import { proxyDel } from './proxy-del'

const description = `\
  ${chalk.green('Proxy switcher')}
    
    Init proxy-cmd: ${chalk.cyan('proxy-cmd init')}
    Init proxy-cmd with url: ${chalk.cyan('proxy-cmd init http://ip:port')}
    Set proxy target url: ${chalk.cyan('proxy-cmd url http://ip:port')}
    Display proxy target url: ${chalk.cyan('proxy-cmd url')}
    Set global proxy environments: ${chalk.cyan('proxy-cmd set')}
    Del global proxy environments: ${chalk.cyan('proxy-cmd del')}
    Set local proxy environments: ${chalk.cyan('proxy-on')}
    Del local proxy environments: ${chalk.cyan('proxy-off')}
  
    GitHub：${chalk.cyan('https://github.com/CN-Tower/proxy-cmd')}`

program
  .version(pkg.version)
  .option('-v, --version', 'output the version number')
  .description(description)

/**
 * Init proxy-cmd
 */
program.command('init').action(() => {
  proxyInit()
})

/**
 * Set or show proxy target url
 */
program.command('url').action(() => {
  proxyUrl()
})

/**
 * Set global proxy environments
 */
program.command('set').action(() => {
  proxySet()
})

/**
 * Del global proxy environments
 */
program.command('del').action(() => {
  proxyDel()
})

program.parse(process.argv)
