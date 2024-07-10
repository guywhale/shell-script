((w) => {
    "use strict";
    const tag = "cv-<<<CLIENT_CODE_LOWERCASE>>>-<<<EXPERIMENT_NUMBER_HYPHENATED>>>";
    const exp = "<<<CLIENT_CODE>>> <<<EXPERIMENT_NUMBER>>>";
    const qa = true;
    //const qa = document.cookie.indexOf('cfQA') > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, `[CONV] ${exp} |`) : () => {};
    const logErr = qa ? Function.prototype.bind.call(console.error, console, `[CONV] ${exp} Error |`) : () => {};
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;

    if (window[tag + "-shared"]) return;

    window[tag + "-shared"] = {
        imgPath: "https://d1mgcpums0qvsa.cloudfront.net/<<<CLIENT_CODE>>>/<<<EXPERIMENT_NUMBER>>>/",
        waitUntil: function (condition, wait = 5000) {
            return new Promise((resolve, reject) => {
                let stop;

                const timeout =
                    wait &&
                    setTimeout(() => {
                        stop = true;
                        reject();
                    }, wait);

                const check = () => {
                    if (stop) return;
                    if (!condition()) return requestAnimationFrame(check);

                    clearTimeout(timeout);
                    resolve(condition());
                };

                requestAnimationFrame(check);
            });
        },
        trackEvent: (eventName, eventAPI) => {
            try {
                window.Kameleoon.API.Goals.processConversion(eventAPI);
                log("EVENT: " + eventName + " - " + eventAPI);
            } catch (err) {
                logErr(err);
            }
        },
        setMatomoCD: function (expName, varName, customDimension) {
            utils
                .waitUntil(() => typeof window._paq !== "undefined" && typeof window._paq.push !== "undefined")
                .then(() => {
                    window._paq.push(["setCustomVariable", customDimension, expName, varName, "visit"]);
                    window._paq.push(["trackEvent", expName, varName]);
                    log(expName, varName, `, Custom dimension: ${customDimension}`);
                })
                .catch((err) => {
                    logErr(err);
                });
        },
    };

    const utils = window[tag + "-shared"];

    utils
        .waitUntil(() => document.querySelector("body"))
        .then(() => {
            window[tag].init();
        });
})(window);
