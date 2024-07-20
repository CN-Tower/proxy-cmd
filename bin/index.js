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
const proxy_set_1 = require("./proxy-set");
const proxy_del_1 = require("./proxy-del");
const description = `\
  ${chalk_1.default.green('Proxy switcher')}
    
    Init proxy-cmd: ${chalk_1.default.cyan('proxy-cmd init')}
    Init proxy-cmd with url: ${chalk_1.default.cyan('proxy-cmd init http://ip:port')}
    Set proxy target url: ${chalk_1.default.cyan('proxy-cmd url http://ip:port')}
    Display proxy target url: ${chalk_1.default.cyan('proxy-cmd url')}
    Set global proxy environments: ${chalk_1.default.cyan('proxy-cmd set')}
    Del global proxy environments: ${chalk_1.default.cyan('proxy-cmd del')}
    Set local proxy environments: ${chalk_1.default.cyan('proxy-on')}
    Del local proxy environments: ${chalk_1.default.cyan('proxy-off')}
  
    GitHub：${chalk_1.default.cyan('https://github.com/CN-Tower/proxy-cmd')}`;
commander_1.program
    .version(package_json_1.default.version)
    .option('-v, --version', 'output the version number')
    .description(description);
/**
 * Init proxy-cmd
 */
commander_1.program.command('init').action(() => {
    (0, proxy_init_1.proxyInit)();
});
/**
 * Set or show proxy target url
 */
commander_1.program.command('url').action(() => {
    (0, proxy_url_1.proxyUrl)();
});
/**
 * Set global proxy environments
 */
commander_1.program.command('set').action(() => {
    (0, proxy_set_1.proxySet)();
});
/**
 * Del global proxy environments
 */
commander_1.program.command('del').action(() => {
    (0, proxy_del_1.proxyDel)();
});
commander_1.program.parse(process.argv);
