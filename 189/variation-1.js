((w) => {
    const tag =
        "cv-int-189";
    const exp = "INT 189";
    const qa = true;
    //const qa = document.cookie.indexOf('cfQA') > -1;
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    const log = qa
        ? Function.prototype.bind.call(console.log, console, `[CONV] ${exp} |`)
        : () => {};
    const logErr = qa
        ? Function.prototype.bind.call(
              console.error,
              console,
              `[CONV] ${exp} Error |`
          )
        : () => {};

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
