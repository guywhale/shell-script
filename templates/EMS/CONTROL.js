((w) => {
    "use strict";
    const tag = "cv-<<<CLIENT_CODE_LOWERCASE>>>-<<<EXPERIMENT_NUMBER_HYPHENATED>>>";
    const exp = "<<<CLIENT_CODE>>> <<<EXPERIMENT_NUMBER>>>";
    const qa = true;
    //const qa = document.cookie.indexOf('cfQA') > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, `[CONV] ${exp} |`) : () => {};
    const logErr = qa ? Function.prototype.bind.call(console.error, console, `[CONV] ${exp} Error |`) : () => {};
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    let utils;

    window[tag] = {
        variant: "Control",
        init: function () {
            utils = window[tag + "-shared"];
            log(this.variant);
        },
    };
})(window);
