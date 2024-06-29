#!/usr/bin/env node

const pkg = require('../package.json')

const { program } = require('commander')
const chalk = require('chalk')

program.version(pkg.version).option('-v, --version', 'output the version number').description(`\
  ${chalk.green('Proxy switcher')}
    
    Set proxy url: ${chalk.cyan('proxy-url')}
    set proxy env: ${chalk.cyan('proxy-set')}
    Remove proxy env: ${chalk.cyan('proxy-del')}
  
    GitHub：${chalk.blue('https://github.com/CN-Tower/proxy-cmd')}`)

program.parse(process.argv)