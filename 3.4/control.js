((w) => {
    "use strict";
    const tag = "cv-ems-3-4";
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    let utils;

    window[tag] = {
        variant: "Control",
        init: function () {
            utils = window[tag + "-shared"];
            utils.log(this.variant);
        },
    };
})(window);
