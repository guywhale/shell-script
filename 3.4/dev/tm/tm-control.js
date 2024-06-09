// ==UserScript==
// @name         EMS 3.4 - Control
// @author       Guy Whale
// @match        https://*/*
// @require      file:///Users/guywhale/repos/experiments/EMS/3.4/shared.js
// @require      file:///Users/guywhale/repos/experiments/EMS/3.4/control.js
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

var cssFile = GM_getResourceText("cssFile");
GM_addStyle(cssFile);
