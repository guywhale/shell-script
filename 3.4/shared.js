((w) => {
    "use strict";
    const tag = "cv-ems-3-4";
    const exp = "EMS 3.4";
    const qa = true;
    //const qa = document.cookie.indexOf('cfQA') > -1;
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const campaignId = 9999999; // Replace with the correct campaign ID

    if (window[tag + "-shared"]) return;

    window[tag + "-shared"] = {
        log: qa ? Function.prototype.bind.call(console.log, console, `[CONV] ${exp} |`) : () => {},
        logErr: qa ? Function.prototype.bind.call(console.error, console, `[CONV] ${exp} Error |`) : () => {},
        imgPath: "https://d1mgcpums0qvsa.cloudfront.net/EMS/3.4/",
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
                this.log(eventName);
            } catch (err) {
                this.logErr(err);
            }
        },
        segmentUser: function (segmentName, segmentVal) {
            try {
                const obj = {};

                obj[segmentName] = segmentVal;

                window.abtasty.send("segment", {
                    s: obj,
                });

                this.log(segmentName);
            } catch (err) {
                this.logErr(err);
            }
        },
        watchDataLayer: function (callback) {
            if (typeof window.dataLayer === "undefined" || window.dataLayer.push === "undefined") {
                this.logErr("dataLayer is not defined");
                return;
            }

            const originalPush = window.dataLayer.push;

            window.dataLayer.push = function (...args) {
                originalPush.apply(this, args);
                callback(args[0]);
            };
        },
    };

    const utils = window[tag + "-shared"];
    window[tag].init();
})(window);
