#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const os_1 = __importDefault(require("os"));
const chalk_1 = __importDefault(require("chalk"));
const proxyCmd = (0, path_1.join)(os_1.default.homedir(), 'proxy-cmd');
(0, fs_extra_1.ensureDirSync)(proxyCmd);
const proxyUrl = (0, path_1.join)(proxyCmd, '.proxy-url');
(0, fs_extra_1.ensureFileSync)(proxyUrl);
let purl = (0, fs_extra_1.readFileSync)(proxyUrl, 'utf-8');
let [x, cmd, url] = process.argv;
if (x === 'proxy-url')
    url = cmd;
if (url && url.match(/^https?:\/\/[\d.:]+$/gm)) {
    (0, fs_extra_1.writeFileSync)(proxyUrl, url);
    purl = url;
    console.log(`Proxy url set to: ${chalk_1.default.cyan(url)}`);
}
// Windows
if (os_1.default.platform() === 'win32') {
    // Set PROXY_URL
    try {
        (0, child_process_1.execSync)(`setx PROXY_URL "${purl}" /M`, { stdio: 'inherit' });
    }
    catch { }
    // Set alias
    const alaisBat = (0, path_1.join)(proxyCmd, 'alais.bat');
    if ((0, fs_extra_1.existsSync)(alaisBat))
        (0, fs_extra_1.removeSync)(alaisBat);
    (0, fs_extra_1.copyFileSync)((0, path_1.join)(__dirname, 'alais.bat'), alaisBat);
    try {
        (0, child_process_1.execSync)(`REG add "HKEY_CURRENT_USER\\Software\\Microsoft\\Command Processor" /v AutoRun /t REG_SZ /d "${alaisBat}" /f`, { stdio: 'inherit' });
    }
    catch { }
}
// MacOS
else if (os_1.default.platform() === 'darwin') {
    const rcFile = (0, path_1.join)(os_1.default.homedir(), '.zshrc');
    (0, fs_extra_1.ensureFileSync)(rcFile);
    let rcTpl = (0, fs_extra_1.readFileSync)(rcFile, 'utf-8');
    // Set PROXY_URL
    if (rcTpl.match(/^\s*PROXY_URL\s*=.*$/gm)) {
        rcTpl = rcTpl.replace(/^\s*PROXY_URL\s*=.*$/gm, `PROXY_URL='${purl}'`);
    }
    else {
        rcTpl = `${rcTpl}\nPROXY_URL='${purl}'`;
    }
    // Set alias proxy-on
    const cmdOn = `alias proxy-on="export HTTP_PROXY='$PROXY_URL' && export HTTPS_PROXY='$PROXY_URL'"`;
    if (rcTpl.match(/^\s*alias proxy-on/gm)) {
        rcTpl = rcTpl.replace(/^\s*alias proxy-on.*$/gm, cmdOn);
    }
    else {
        rcTpl = `${rcTpl}\n${cmdOn}`;
    }
    // Set alias proxy-off
    const cmdOff = `alias proxy-off="unset HTTP_PROXY && unset HTTPS_PROXY"`;
    if (rcTpl.match(/^\s*alias proxy-off/gm)) {
        rcTpl = rcTpl.replace(/^\s*alias proxy-off.*$/gm, cmdOff);
    }
    else {
        rcTpl = `${rcTpl}\n${cmdOff}`;
    }
    (0, fs_extra_1.writeFileSync)(rcFile, rcTpl);
    (0, child_process_1.execSync)(`source ${rcFile}`, { stdio: 'inherit' });
}
console.log(chalk_1.default.green(`proxy-cmd inited, restart your terminal and run \`proxy-on\` or \`proxy-off\` to switch proxy`));