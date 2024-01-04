#!/bin/sh
# Variables
client_code=$(echo "$1" | tr '[:lower:]' '[:upper:]')
client_code_lowercase=$(echo "$client_code" | tr '[:upper:]' '[:lower:]')
experiment_number="$2"
experiment_number_hyphenated="${experiment_number//\./-}"

# Locations of default templates
templates_path="$HOME/bin/conv/templates"
js_template="$templates_path/default/V1.js"
sass_template="$templates_path/default/V1.scss"
tm_template="$templates_path/default/TM-V1.js"

# Swap for client specific templates if they exist
if [ -e "$templates_path/$client_code/V1.js" ]; then
    js_template="$templates_path/$client_code/V1.js"
fi

if [ -e "$templates_path/$client_code/V1.scss" ]; then
    sass_template="$templates_path/$client_code/V1.scss"
fi

if [ -e "$templates_path/$client_code/TM-V1.js" ]; then
    tm_template="$templates_path/$client_code/TM-V1.js"
fi

# If directories don't exist, make them
if [ ! -d "./$experiment_number" ]; then
    mkdir $experiment_number
fi

if [ ! -d "./$experiment_number/dev" ]; then
    mkdir $experiment_number/dev
fi

sass_path="$experiment_number/dev/scss"

if [ ! -d "./$sass_path" ]; then
    mkdir $sass_path
fi

tm_path="$experiment_number/dev/tm"

if [ ! -d "./$tm_path" ]; then
    mkdir $tm_path
fi

# Create and populate variation-1.css
if [ ! -e "$experiment_number/variation-1.css" ]; then
    touch $experiment_number/variation-1.css
fi

# Parameter string for replacing placeholders in templates with variables
replace_placeholders="s/<<<CLIENT_CODE>>>/$client_code/g; s/<<<CLIENT_CODE_LOWERCASE>>>/$client_code_lowercase/g; s/<<<EXPERIMENT_NUMBER>>>/$experiment_number/g; s/<<<EXPERIMENT_NUMBER_HYPHENATED>>>/$experiment_number_hyphenated/g"

# Create and populate variation-1.js
if [ ! -e "$experiment_number/variation-1.js" ]; then
    touch $experiment_number/variation-1.js
    cat "$js_template" | sed "$replace_placeholders" >> $experiment_number/variation-1.js 
fi

# Create and populate /dev/scss/variation-1.scss
if [ ! -e "$experiment_number/dev/scss/variation-1.scss" ]; then
    touch $experiment_number/dev/scss/variation-1.scss
    cat "$sass_template" | sed "$replace_placeholders" >> $experiment_number/dev/scss/variation-1.scss
fi

# Create and populate /dev/tm/tm-variation-1.js
if [ ! -e "$experiment_number/dev/tm/tm-variation-1.js" ]; then
    touch $experiment_number/dev/tm/tm-variation-1.js
    cat "$tm_template" | sed "$replace_placeholders" >> $experiment_number/dev/tm/tm-variation-1.js 
fi

conv_id="\n[CONV] $client_code $experiment_number ->"

# Check if sass CLI is installed globally and install if not
if command -v sass &> /dev/null; then
    echo "$conv_id Ready\n"
else
    echo "$conv_id Installing SASS globally via NPM...\n"
    npm install -g sass
    sleep 1

    if command -v sass &> /dev/null; then
        echo "$conv_id SASS successfully installed.\n"
        echo "$conv_id Ready\n"
    else
        echo "$conv_id SASS installation failed. Please install SASS globally. Exiting...\n"
        exit 1
    fi
fi

# Run SASS compiler
sass --watch --no-source-map ./$sass_path/variation-1.scss ./$experiment_number/variation-1.css