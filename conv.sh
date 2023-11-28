#!/bin/sh
# Variables
client_code="$1"
client_code_lowercase=$(echo "$client_code" | tr '[:upper:]' '[:lower:]')
experiment_number="$2"
experiment_number_hyphenated="${experiment_number//\./-}"
replace_placeholders="s/<<<CLIENT_CODE>>>/$client_code/g; s/<<<CLIENT_CODE_LOWERCASE>>>/$client_code_lowercase/g; s/<<<EXPERIMENT_NUMBER>>>/$experiment_number/g; s/<<<EXPERIMENT_NUMBER_HYPHENATED>>>/$experiment_number_hyphenated/g"
js_template="./templates/default/JS.js"
sass_template="./templates/default/SASS.scss"
tm_template="./templates/default/TM.js"


# If directories don't exist, make them
if [ ! -d "./$experiment_number" ]; then
  mkdir $experiment_number
fi

if [ ! -d "./$experiment_number/dev" ]; then
  mkdir $experiment_number/dev
fi

# Create and populate variation-1.css
if [ ! -e "$experiment_number/variation-1.css" ]; then
  touch $experiment_number/variation-1.css
fi

# Create and populate variation-1.js
if [ ! -e "$experiment_number/variation-1.js" ]; then
  touch $experiment_number/variation-1.js
  cat "$js_template" | sed "$replace_placeholders" >> $experiment_number/variation-1.js 
fi

# Create and populate /dev/variation-1.scss
if [ ! -e "$experiment_number/dev/variation-1.scss" ]; then
  touch $experiment_number/dev/variation-1.scss
  cat "$sass_template" | sed "$replace_placeholders" >> $experiment_number/dev/variation-1.scss
fi

# Create and populate /dev/tampermonkey.js
if [ ! -e "$experiment_number/dev/tampermonkey.js" ]; then
  touch $experiment_number/dev/tampermonkey.js
  cat "$tm_template" | sed "$replace_placeholders" >> $experiment_number/dev/tampermonkey.js 
fi

# Check if the `sass` executable is in the npm global bin directory
if command -v sass &> /dev/null; then
  echo "\n[CONV] "$client_code $experiment_number" -> Ready\n"
else
  echo "[CONV] "$client_code $experiment_number" -> Installing Sass globally via NPM..."
  npm install -g sass
fi

cd $experiment_number/dev

# Run SASS compiler
sass --watch --no-source-map variation-1.scss ../variation-1.css