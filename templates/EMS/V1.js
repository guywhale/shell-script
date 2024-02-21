((w) => {
    const tag = "cv-<<<CLIENT_CODE_LOWERCASE>>>-<<<EXPERIMENT_NUMBER_HYPHENATED>>>";
    const exp = "<<<CLIENT_CODE>>> <<<EXPERIMENT_NUMBER>>>";
    const qa = true;
    //const qa = document.cookie.indexOf('cfQA') > -1;
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const log = qa ? Function.prototype.bind.call(console.log, console, `[CONV] ${exp} |`) : () => {};
    const logErr = qa ? Function.prototype.bind.call(console.error, console, `[CONV] ${exp} Error |`) : () => {};
    const campaignId = 9999999; // Replace with the correct campaign ID

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
            try {
                window.ABTastyClickTracking(`[CONV] [${exp}] ${eventName}`, null, campaignId);
                log(eventName);
            } catch (err) {
                logErr(err);
            }
        },
        segmentUser: (segmentName, segmentVal) => {
            try {
                const obj = {};

                obj[segmentName] = segmentVal;

                window.abtasty.send("segment", {
                    s: obj,
                });

                log(segmentName);
            } catch (err) {
                logErr(err);
            }
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
