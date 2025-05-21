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
${chalk_1.default.green('proxy-cmd is a proxy environment variables switcher.\n')}
  Commands:\n
  >                         Init proxy-cmd: ${chalk_1.default.cyan('proxy init')}
  >                Init proxy-cmd with url: ${chalk_1.default.cyan('proxy init http://127.0.0.1:8234')}
  > Set proxy env vars in current terminal: ${chalk_1.default.cyan('proxy-on')}
  > Del proxy env vars in current terminal: ${chalk_1.default.cyan('proxy-off')}
  >         Set global proxy env variables: ${chalk_1.default.cyan('proxy set')}
  >         Del global proxy env variables: ${chalk_1.default.cyan('proxy del')}
  >                        Reset proxy url: ${chalk_1.default.cyan('proxy url http://127.0.0.1:7890')}
  >                         Show proxy url: ${chalk_1.default.cyan('proxy url')}
  >                    Set no_proxy config: ${chalk_1.default.cyan('proxy np localhost,127.0.0.1')}
  >                   Show no_proxy config: ${chalk_1.default.cyan('proxy np')}
  >                  Delte no_proxy config: ${chalk_1.default.cyan('proxy np del')}
  
  GitHub：${chalk_1.default.cyan('https://github.com/CN-Tower/proxy-cmd')}`;
commander_1.program.version(package_json_1.default.version).option('-v, --version', 'output the version number').description(description);
/**
 * Init proxy-cmd
 * eg: proxy init http://127.0.0.1:8234 localhost,127.0.0.1
 */
commander_1.program
    .command('init')
    .action(() => (0, proxy_init_1.proxyInit)())
    .description(`Init proxy-cmd: ${chalk_1.default.cyan('proxy init')}`);
/**
 * Set global proxy environments
 */
commander_1.program
    .command('set')
    .action(() => (0, proxy_set_1.proxySet)())
    .description(`Set global proxy environments: ${chalk_1.default.cyan('proxy set')}`);
/**
 * Del global proxy environments
 */
commander_1.program
    .command('del')
    .action(() => (0, proxy_del_1.proxyDel)())
    .description(`Del global proxy environments: ${chalk_1.default.cyan('proxy del')}`);
/**
 * Set or show proxy target url
 * eg: proxy url http://127.0.0.1:8234
 */
commander_1.program
    .command('url')
    .action(() => (0, proxy_url_1.proxyUrl)())
    .description(`Set or Show proxy url: ${chalk_1.default.cyan('proxy url http://127.0.0.1:8234')}`);
/**
 * Set or show NO_PROXY config
 * eg: proxy np localhost,127.0.0.1
 */
commander_1.program
    .command('np')
    .action(() => (0, no_proxy_1.noProxy)())
    .description(`Set or show no_proxy config: ${chalk_1.default.cyan('proxy np localhost,127.0.0.1')}`);
commander_1.program.parse(process.argv);
