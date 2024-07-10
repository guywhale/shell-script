// ==UserScript==
// @name         <<<CLIENT_CODE>>> <<<EXPERIMENT_NUMBER>>> - Control
// @author       Guy Whale
// @match        https://*/*
// @require      file:///Users/guywhale/repos/experiments/<<<CLIENT_CODE>>>/<<<EXPERIMENT_NUMBER>>>/shared.js
// @require      file:///Users/guywhale/repos/experiments/<<<CLIENT_CODE>>>/<<<EXPERIMENT_NUMBER>>>/control.js
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

var cssFile = GM_getResourceText("cssFile");
GM_addStyle(cssFile);
