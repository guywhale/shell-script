((w) => {
    "use strict";
    const tag = "cv-<<<CLIENT_CODE_LOWERCASE>>>-<<<EXPERIMENT_NUMBER_HYPHENATED>>>";
    const exp = "<<<CLIENT_CODE>>> <<<EXPERIMENT_NUMBER>>>";
    const qa = true;
    //const qa = document.cookie.indexOf('cfQA') > -1;
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const log = qa ? Function.prototype.bind.call(console.log, console, `[CONV] ${exp} |`) : () => {};
    const logErr = qa ? Function.prototype.bind.call(console.error, console, `[CONV] ${exp} Error |`) : () => {};
    const imgPath = "https://d1mgcpums0qvsa.cloudfront.net/<<<CLIENT_CODE>>>/<<<EXPERIMENT_NUMBER>>>/";
    const testAlias = "ta_FAKEALIASFORLOCAL";
    //  const testAlias = Config.testAlias

    const utils = {
        waitUntil: (condition, wait = 5000) => {
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
        trackEvent: (eventName) => {
            utils
                .waitUntil(() => window.WT)
                .then((wtReady) => {
                    window.WT.click({
                        testAlias: testAlias,
                        conversionPoint: eventName,
                    });

                    log("WT event sent: ", eventName);
                })
                .catch((err) => {
                    logErr(err);
                });
        },
    };

    utils
        .waitUntil(() => document.querySelector("body"), 0)
        .then((element) => {
            log("Activated", element);
        })
        .catch((err) => {
            logErr(err);
        });
})(window);
