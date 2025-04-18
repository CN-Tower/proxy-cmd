#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_1 = __importDefault(require("../package.json"));
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const proxy_init_1 = require("./proxy-init");
const proxy_url_1 = require("./proxy-url");
const no_proxy_1 = require("./no-proxy");
const proxy_set_1 = require("./proxy-set");
const proxy_del_1 = require("./proxy-del");
const description = `\
  ${chalk_1.default.green('Proxy switcher')}
    Init proxy-cmd: ${chalk_1.default.cyan('proxy-cmd init')}
    Init proxy-cmd with url: ${chalk_1.default.cyan('proxy-cmd init http://ip:port')}
    Set current process proxy environments: ${chalk_1.default.cyan('proxy-on')}
    Del current process proxy environments: ${chalk_1.default.cyan('proxy-off')}
    Set global proxy environments: ${chalk_1.default.cyan('proxy-cmd set')}
    Del global proxy environments: ${chalk_1.default.cyan('proxy-cmd del')}
    Set proxy target url: ${chalk_1.default.cyan('proxy-cmd url http://ip:port')}
    Show proxy target url: ${chalk_1.default.cyan('proxy-cmd url')}
    Set NO_PROXY config: ${chalk_1.default.cyan('proxy-cmd np localhost,127.0.0.1')}
    Show NO_PROXY config: ${chalk_1.default.cyan('proxy-cmd np')}
    Delte NO_PROXY config: ${chalk_1.default.cyan('proxy-cmd np del')}
  
    GitHub：${chalk_1.default.cyan('https://github.com/CN-Tower/proxy-cmd')}`;
commander_1.program.version(package_json_1.default.version).option('-v, --version', 'output the version number').description(description);
/**
 * Init proxy-cmd
 * eg: proxy-cmd init http://127.0.0.1:8234 localhost,127.0.0.1
 */
commander_1.program
    .command('init')
    .action(() => (0, proxy_init_1.proxyInit)())
    .description(`Init proxy-cmd: ${chalk_1.default.cyan('proxy-cmd init')}`);
/**
 * Set global proxy environments
 */
commander_1.program
    .command('set')
    .action(() => (0, proxy_set_1.proxySet)())
    .description(`Set global proxy environments: ${chalk_1.default.cyan('proxy-cmd set')}`);
/**
 * Del global proxy environments
 */
commander_1.program
    .command('del')
    .action(() => (0, proxy_del_1.proxyDel)())
    .description(`Del global proxy environments: ${chalk_1.default.cyan('proxy-cmd del')}`);
/**
 * Set or show proxy target url
 * eg: proxy-cmd url http://127.0.0.1:8234
 */
commander_1.program
    .command('url')
    .action(() => (0, proxy_url_1.proxyUrl)())
    .description(`Set or Show proxy target url: ${chalk_1.default.cyan('proxy-cmd url http://ip:port')}`);
/**
 * Set or show NO_PROXY config
 * eg: proxy-cmd np localhost,127.0.0.1
 */
commander_1.program
    .command('np')
    .action(() => (0, no_proxy_1.noProxy)())
    .description(`Set or show NO_PROXY config: ${chalk_1.default.cyan('proxy-cmd np localhost,127.0.0.1')}`);
commander_1.program.parse(process.argv);
