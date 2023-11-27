#!/bin/sh
# Variables
experiment_number="$2"
hypenated_experiment_number="${experiment_number//\./-}"
company_code="$1"
lowercase_company_code=$(echo "$company_code" | tr '[:upper:]' '[:lower:]')

# Build files and directories
mkdir $experiment_number $experiment_number/dev
touch $experiment_number/dev/variation-1.scss $experiment_number/variation-1.css $experiment_number/variation-1.js

# Populate SCSS file
cat <<EOF > $experiment_number/dev/variation-1.scss
\$tag: '.cv-$lowercase_company_code-$hypenated_experiment_number';

#{\$tag} {
    background-color: yellow !important;
}
EOF

# Populate JS file
cat <<EOF > $experiment_number/variation-1.js
((w) => {
  const tag = 'cv-$lowercase_company_code-$hypenated_experiment_number';
  const exp = '$company_code $experiment_number';
  const qa = true;
  //const qa = document.cookie.indexOf('cfQA') > -1;
  const window = typeof unsafeWindow !== 'undefined' ? unsafeWindow : w;
  const log = qa ? Function.prototype.bind.call(console.log, console, \`[CONV] \$\{exp\} \|\`) : () => { };
  const logErr = qa ? Function.prototype.bind.call(console.error, console, \`[CONV] \$\{exp\} Error \|\`) : () => { };

  const utils = {
    waitUntil: (condition, wait = 5000) => {
      return new Promise((resolve, reject) => {
        let stop;
  
        const timeout =
          wait && setTimeout(() => {
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
    }
  };

  utils
    .waitUntil(() => document.querySelector('body'), 0)
    .then((element) => {
      log('Activated', element);
    })
    .catch((err) => {
      logErr(err);
    });

})(window);
EOF

sass --watch --no-source-map $experiment_number/dev/variation-1.scss $experiment_number/variation-1.css