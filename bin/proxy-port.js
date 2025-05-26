#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxyPort = void 0;
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const proxy_url_1 = require("./proxy-url");
const os_1 = __importDefault(require("os"));
const chalk_1 = __importDefault(require("chalk"));
/**
 * Set or show proxy port
 */
const proxyPort = () => {
    const proxyCmd = (0, path_1.join)(os_1.default.homedir(), 'proxy-cmd');
    const pxUrlFile = (0, path_1.join)(proxyCmd, '.proxy-url');
    (0, fs_extra_1.ensureFileSync)(pxUrlFile);
    let [x, cmd, p, port] = process.argv;
    x = (0, path_1.basename)(x);
    if (x === 'proxy-cmd' || x === 'proxy')
        port = p;
    // Set proxy url port
    if (port && port.match(/^\d+$/)) {
        let url = (0, fs_extra_1.readFileSync)(pxUrlFile, 'utf-8');
        if (!url) {
            url = `http://127.0.0.1:${port}`;
        }
        else {
            url = url.replace(/:\d+$/, `:${port}`);
        }
        (0, proxy_url_1.proxyUrl)(url);
    }
    // Show current proxy url port
    else {
        const purl = (0, fs_extra_1.readFileSync)(pxUrlFile, 'utf-8');
        console.log(`Current proxy url is: ${chalk_1.default.cyan(purl)}`);
    }
};
exports.proxyPort = proxyPort;
