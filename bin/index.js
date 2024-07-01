#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_1 = __importDefault(require("../package.json"));
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
commander_1.program.version(package_json_1.default.version).option('-v, --version', 'output the version number').description(`\
  ${chalk_1.default.green('Proxy switcher')}
    
    Init proxy: ${chalk_1.default.cyan('proxy-init')}
    Show proxy target url: ${chalk_1.default.cyan('proxy-url')}
    Set proxy env global: ${chalk_1.default.cyan('proxy-set')}
    Unset proxy env global: ${chalk_1.default.cyan('proxy-del')}
    Set proxy env local: ${chalk_1.default.cyan('proxy-on')}
    Unset proxy env local: ${chalk_1.default.cyan('proxy-off')}
  
    GitHub：${chalk_1.default.blue('https://github.com/CN-Tower/proxy-cmd')}`);
commander_1.program.parse(process.argv);
