#!/usr/bin/env node

import pkg from '../package.json'
import { program } from 'commander'
import chalk from 'chalk'

program.version(pkg.version).option('-v, --version', 'output the version number').description(`\
  ${chalk.green('Proxy switcher')}
    
    Init proxy: ${chalk.cyan('proxy-init')}
    Show proxy target url: ${chalk.cyan('proxy-url')}
    Set proxy env global: ${chalk.cyan('proxy-set')}
    Unset proxy env global: ${chalk.cyan('proxy-del')}
    Set proxy env local: ${chalk.cyan('proxy-on')}
    Unset proxy env local: ${chalk.cyan('proxy-off')}
  
    GitHub：${chalk.blue('https://github.com/CN-Tower/proxy-cmd')}`)

program.parse(process.argv)
