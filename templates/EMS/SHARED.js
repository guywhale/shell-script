((w) => {
    "use strict";
    const tag = "cv-<<<CLIENT_CODE_LOWERCASE>>>-<<<EXPERIMENT_NUMBER_HYPHENATED>>>";
    const exp = "<<<CLIENT_CODE>>> <<<EXPERIMENT_NUMBER>>>";
    const qa = true;
    //const qa = document.cookie.indexOf('cfQA') > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, `[CONV] ${exp} |`) : () => {};
    const logErr = qa ? Function.prototype.bind.call(console.error, console, `[CONV] ${exp} Error |`) : () => {};
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const campaignId = 9999999; // Replace with the correct campaign ID

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
        trackEvent: function (eventName) {
            try {
                window.ABTastyClickTracking(`[CONV] [${exp}] ${eventName}`, null, campaignId);
                log(eventName);
            } catch (err) {
                logErr(err);
            }
        },
        segmentUser: function (segmentName, segmentVal) {
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
        watchDataLayer: function (callback) {
            this.waitUntil(
                () => typeof window.dataLayer !== "undefined" && typeof window.dataLayer.push !== "undefined"
            )
                .then(() => {
                    const originalPush = window.dataLayer.push;

                    window.dataLayer.push = function (...args) {
                        originalPush.apply(this, args);
                        callback(args[0]);
                    };
                })
                .catch((err) => {
                    logErr(err);
                });
        },
    };

    const utils = window[tag + "-shared"];
    window[tag].init();
})(window);
