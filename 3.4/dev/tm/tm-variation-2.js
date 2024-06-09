// ==UserScript==
// @name         EMS 3.4 - Variation 2
// @author       Guy Whale
// @match        https://*/*
// @resource     cssFile file:///Users/guywhale/repos/experiments/EMS/3.4/variation-2.css
// @require      file:///Users/guywhale/repos/experiments/EMS/3.4/shared.js
// @require      file:///Users/guywhale/repos/experiments/EMS/3.4/variation-2.js
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

var cssFile = GM_getResourceText("cssFile");
GM_addStyle(cssFile);
