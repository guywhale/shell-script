((w) => {
    "use strict";
    const tag = "cv-<<<CLIENT_CODE_LOWERCASE>>>-<<<EXPERIMENT_NUMBER_HYPHENATED>>>";
    const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
    let utils;

    window[tag] = {
        variant: "Variation 2",
        init: function () {
            utils = window[tag + "-shared"];
            utils.log(this.variant);
        },
    };
})(window);
