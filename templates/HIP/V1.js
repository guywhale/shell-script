/*
 ** Author: Guy Whale
 ** Company: Conversion
 ** Date: 2024
 */

/*=========================================================================
    <<<CLIENT_CODE>>> <<<EXPERIMENT_NUMBER>>>
=========================================================================*/

((w) => {
    const clCode = "<<<CLIENT_CODE>>>";
    const expId = "<<<EXPERIMENT_NUMBER_HYPHENATED>>>";
    const tag = `cv-<<<CLIENT_CODE_LOWERCASE>>>-${expId}`;
    const exp = `${clCode} ${expId}`;
    const qa = document.cookie.indexOf("cfQA") > -1 || document.cookie.indexOf("wt.bdebug") > -1;
    const log = qa ? Function.prototype.bind.call(console.log, console, `[CONV] ${exp} |`) : () => {};
    const imgPath = `https://d1mgcpums0qvsa.cloudfront.net/${clCode}/${expId}`;

    /* ELEMENT TO WAIT BEFORE ACTIVATING THE EXPERIMENT */
    const waitForClassName = "";

    // IFRAME PARAMETERS:
    // const wtExpIdControl = '2543583'; // EXPERIMENT ID - CONTROL
    // const wtExpIdVariation = '2543585'; // EXPERIMENT ID - VARIATION
    // const wtProjAlias = 'ta_CONV_DEV_HIP_11_3RD_JUNE'; // PROJECT ALIAS
    // const wtTestId = '2543582'; // TEST ID
    // const dataLayerParentEvent = 'cvIframeExp1_1_June_3rd';

    // GLOBAL VAR
    let hjInit = false;
    // let iframeMessageSent = false; // FOR IFRAME EXPERIMENTS

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

        observeElement: function (targetClass, runFunction) {
            let targetNode = document.querySelector(targetClass),
                config = { attributes: true, childList: true, subtree: true };
            let callback = function (mutationList, observer) {
                // Use traditional 'for loops' for IE 11
                for (let mutation of mutationList) {
                    if (mutation.type === "childList") {
                        runFunction();
                    } else if (mutation.type === "attributes") {
                        //window[tag].log('The ' + mutation.attributeName + ' attribute was modified.');
                    }
                }
            };
            let observer = new MutationObserver(callback);
            observer.observe(targetNode, config);
        },

        initHotjar: (expType) => {
            try {
                if (expType) {
                    if (hjInit) return;

                    let hjLabel = `${clCode} ${expId}_${expType}`,
                        maxCalls = 10,
                        waitForHj = setInterval(() => {
                            if (typeof window.hj === "function") {
                                clearInterval(waitForHj);

                                hj("trigger", hjLabel);
                                hj("tagRecording", [hjLabel]);

                                log(`Hotjar initialised: ${hjLabel}`);
                                hjInit = true;
                            }

                            if (--maxCalls < 0) {
                                clearInterval(waitForHj);
                                log("Hotjar failed to load");
                            }
                        }, 500);
                }
            } catch (err) {
                log(err);
            }
        },
    };

    WTOTestCONV_HIP_4_4.exec(function (Test, Config) {
        return {
            /* Configuration parameters
            -------------------------------------------------------------*/
            Config: {
                testName: "",
                developer: "Guy",
                cssHide: "",
                useBeacon: false,
                cssPrefixClass: "",
                // Required for pinning of levels via _wt.exp=FxLx
                factors: { F1: { NAME: "Factor 1", L1: "F1L1", L2: "F1L2" } },
            },
            device: WT.helpers.device,

            /*/////////////////////////////////////////////////////////////
            |   ENTRY POINT TO THE TEST
            -------------------------------------------------------------*/
            Run: function () {
                Test.poll({
                    msg: "body polling",
                    // Polling function
                    when: function () {
                        return document.querySelectorAll(waitForClassName).length;
                    },
                    // Polling callback
                    then: function () {
                        //shouldSuspend: checks if pageview has fired if not suspend pageview
                        Config.shouldSuspend = (function () {
                            try {
                                let val = Test.cookie.get("_wt.control-2042066-" + Config.testAlias);
                                Test.debug.log(`Cookie value: ${val}`);

                                if (
                                    val &&
                                    JSON.parse(
                                        WT.optimize.Library.z7f69(
                                            val,
                                            WT.optimizeModule.prototype.wtConfigObj.s_keyToken
                                        )
                                    ).pageTrack
                                ) {
                                    return false;
                                }
                                return true;
                            } catch (err) {
                                if (document.cookie.match(/_wt.bdebug=true/i)) console.log(err);
                            }
                        })();
                        if (Config.shouldSuspend) Test.pageview.suspend("waiting for test entry");

                        function activateTest() {
                            // track and render
                            if (Config.shouldSuspend) {
                                Test.pageview.track();
                                Config.shouldSuspend = false;
                                Test.debug.log("Pageview tracked");
                            }

                            //render levels
                            Test.start("Rendering", Test.Render);
                            Test.start("Tracking", Test.Tracking);

                            // SHOW PAGE
                            Test.showHidePage(Config.showPage);
                        }

                        // LOGIC TO ACTIVATE TEST HERE
                        activateTest();
                    },
                });
            },

            /*/////////////////////////////////////////////////////////////
            |   Executes visual page transformations
            -------------------------------------------------------------*/
            Render: function () {
                // GLOBAL RENDER CSS
                var css = new Test.CSS({ id: "wto-css-" + Config.testAlias });
                var console = Test.debug;

                /*  FACTOR 1
                =============================================================*/
                /*-------------------------------------------------------------
                    LEVEL 1
                -------------------------------------------------------------*/
                Test.render("F1L1", function (level) {
                    var css = level.css;
                    Test.debug.log("level:");
                    Test.debug.dir(level);

                    // Transformations for this level to go here.
                    Test.debug.log("ACTIVE - control: F1L1");
                    initExperiment("control");
                });

                /*-------------------------------------------------------------
                    LEVEL 2
                -------------------------------------------------------------*/
                Test.render("F1L2", function (level) {
                    var css = level.css;
                    Test.debug.log("level:");
                    Test.debug.dir(level);

                    // Transformations for this level to go here.
                    Test.debug.log("ACTIVE - variation: F1L2");
                    initExperiment("variation");
                });

                Test.status.set("rendered");
            },

            /*/////////////////////////////////////////////////////////////
            |   Creates conversion points
            -------------------------------------------------------------*/
            Tracking: function () {
                var console = Test.debug;

                /*=========================================================================
                    PAGEVIEW
                =========================================================================*/
                Test.event.bindAfter("pageview", function () {
                    /*
                        On page load conversions or actions can go here, e.g.

                        if(userIsABusiness){
                            Test.conversion('userIsABusiness');
                        }
                    */
                });

                /*=========================================================================
                    CLICK-TRACKING
                =========================================================================*/

                var delegate = (function () {
                    if (!Element.prototype.matches) {
                        Element.prototype.matches =
                            Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
                    }

                    return function (el, evt, sel, handler) {
                        el.addEventListener(evt, function (event) {
                            var t = event.target;
                            while (t && t !== this) {
                                if (t.matches(sel)) {
                                    handler.call(t, event);
                                }
                                t = t.parentNode;
                            }
                        });
                    };
                })();

                /*
                    Click tracking can go here, e.g.
                
                    delegate(document, 'click', '#myElm', function(){
                        Test.conversion('Click_myelm');
                    });
                */
            },
        };
    });

    /*=========================================================================
        INIT EXPERIMENT
    =========================================================================*/

    function initExperiment(variation) {
        utils
            .waitUntil(() => document.body)
            .then((docBody) => {
                docBody.classList.add(tag);

                if (qa && document.title.indexOf("CONV QA") < 0) {
                    document.title = `[CONV QA] ${document.title}`;
                }

                // CHECK IF INFO BANNER IS ALREADY ACTIVE
                let isActive = document.querySelector(`.${tag}-active`);

                if (!isActive) {
                    utils.initHotjar(variation);
                    if (variation !== "control") {
                        initVariation(variation);
                    }
                }
            });
    }

    /*=========================================================================
        VARIATION CODE
    =========================================================================*/

    function initVariation(expType) {
        log(`running ${exp} - ${expType}`);
    }
})(window);
