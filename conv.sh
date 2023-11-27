#!/bin/sh
# Variables
experiment_number="$2"
hypenated_experiment_number="${experiment_number//\./-}"
company_code="$1"
lowercase_company_code=$(echo "$company_code" | tr '[:upper:]' '[:lower:]')

# If directories don't exist, make them
if [ ! -d "./$experiment_number/dev" ]; then
  mkdir $experiment_number $experiment_number/dev
fi

# Create and populate variation-1.css
if [ ! -e "$experiment_number/variation-1.css" ]; then
  touch $experiment_number/variation-1.css
fi

# Create and populate variation-1.js
if [ ! -e "$experiment_number/variation-1.js" ]; then
  touch $experiment_number/variation-1.js
  cat <<EOF > $experiment_number/variation-1.js
((w) => {
  const tag = 'cv-$lowercase_company_code-$hypenated_experiment_number';
  const exp = '$company_code $experiment_number';
  const qa = true;
  //const qa = document.cookie.indexOf('cfQA') > -1;
  const window = typeof unsafeWindow !== 'undefined' ? unsafeWindow : w;
  const log = qa ? Function.prototype.bind.call(console.log, console, \`[CONV] \${exp} |\`) : () => { };
  const logErr = qa ? Function.prototype.bind.call(console.error, console, \`[CONV] \${exp} Error |\`) : () => { };

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
fi

# Create and populate .gitignore
if [ ! -e "$experiment_number/dev/.gitignore" ]; then
  touch $experiment_number/dev/.gitignore
  cat <<EOF > "$experiment_number/dev/.gitignore"
node_modules/
package-lock.json
EOF
fi

# Create and populate package.json
if [ ! -e "$experiment_number/dev/package.json" ]; then
  touch $experiment_number/dev/package.json
  cat <<EOF > $experiment_number/dev/package.json
{
  "name": "cv-$lowercase_company_code-$hypenated_experiment_number",
  "version": "1.0.0",
  "description": "$company_code $experiment_number",
  "main": "../variation-1.js",
  "scripts": {
    "dev": "sass --watch --no-source-map variation-1.scss ../variation-1.css"
  },
  "author": "Guy Whale",
  "license": "ISC",
  "dependencies": {
    "sass": "^1.69.5"
  }
}
EOF
fi

# Create and populate /dev/variation-1.scss
if [ ! -e "$experiment_number/dev/variation-1.scss" ]; then
  touch $experiment_number/dev/variation-1.scss
  cat <<EOF > $experiment_number/dev/variation-1.scss
\$tag: '.cv-$lowercase_company_code-$hypenated_experiment_number';

#{\$tag} {
    background-color: yellow !important;
}
EOF
fi

cd $experiment_number/dev

# Install node packages
npm install

# Run SASS compiler
npm run dev