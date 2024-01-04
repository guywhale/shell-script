// ==UserScript==
// @name         INT 189 - Variation 1
// @author       Guy Whale
// @match        http://*/*
// @resource     cssFile file:///Users/guywhale/repos/experiments/INT/189/variation-1.css
// @require      file:///Users/guywhale/repos/experiments/INT/189/variation-1.js
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

var cssFile = GM_getResourceText("cssFile");
GM_addStyle(cssFile);
