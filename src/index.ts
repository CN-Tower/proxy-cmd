#!/usr/bin/env node

import pkg from '../package.json'
import { program } from 'commander'
import chalk from 'chalk'
import { proxyInit } from './proxy-init'
import { proxyUrl } from './proxy-url'
import { proxyPort } from './proxy-port'
import { noProxy } from './no-proxy'
import { proxySet } from './proxy-set'
import { proxyDel } from './proxy-del'

const description = `\
${chalk.green('proxy-cmd is a proxy environment variables switcher.\n')}
  Commands:\n
  >                         Init proxy-cmd: ${chalk.cyan('proxy init')}
  >                Init proxy-cmd with url: ${chalk.cyan('proxy init http://127.0.0.1:8234')}
  > Set proxy env vars in current terminal: ${chalk.cyan('proxy-on')}
  > Del proxy env vars in current terminal: ${chalk.cyan('proxy-off')}
  >         Set global proxy env variables: ${chalk.cyan('proxy set')}
  >         Del global proxy env variables: ${chalk.cyan('proxy del')}
  >                         Show proxy url: ${chalk.cyan('proxy url')}
  >                          Set proxy url: ${chalk.cyan('proxy url http://127.0.0.1:7890')}
  >                  Change proxy url port: ${chalk.cyan('proxy port 8899')}
  >                    Set no_proxy config: ${chalk.cyan('proxy np localhost,127.0.0.1')}
  >                   Show no_proxy config: ${chalk.cyan('proxy np')}
  >                  Delte no_proxy config: ${chalk.cyan('proxy np del')}
  
  GitHub：${chalk.cyan('https://github.com/CN-Tower/proxy-cmd')}`

program.version(pkg.version).option('-v, --version', 'output the version number').description(description)

/**
 * Init proxy-cmd
 * eg: proxy init http://127.0.0.1:8234 localhost,127.0.0.1
 */
program
  .command('init')
  .action(() => proxyInit())
  .description(`Init proxy-cmd: ${chalk.cyan('proxy init')}`)

/**
 * Set global proxy environments
 */
program
  .command('set')
  .action(() => proxySet())
  .description(`Set global proxy environments: ${chalk.cyan('proxy set')}`)

/**
 * Del global proxy environments
 */
program
  .command('del')
  .action(() => proxyDel())
  .description(`Del global proxy environments: ${chalk.cyan('proxy del')}`)

/**
 * Set or show proxy url
 * eg: proxy url http://127.0.0.1:8234
 */
program
  .command('url')
  .action(() => proxyUrl())
  .description(`Set or Show proxy url: ${chalk.cyan('proxy url http://127.0.0.1:8234')}`)

/**
 * Set or show proxy port
 * eg: proxy port 8899
 */
program
  .command('port')
  .action(() => proxyPort())
  .description(`Set or Show proxy port: ${chalk.cyan('proxy port 8899')}`)

/**
 * Set or show NO_PROXY config
 * eg: proxy np localhost,127.0.0.1
 */
program
  .command('np')
  .action(() => noProxy())
  .description(`Set or show no_proxy config: ${chalk.cyan('proxy np localhost,127.0.0.1')}`)

program.parse(process.argv)
