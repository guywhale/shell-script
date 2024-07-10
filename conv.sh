#!/bin/sh
# Variables
client_code=$(echo "$1" | tr '[:lower:]' '[:upper:]')
client_code_lowercase=$(echo "$client_code" | tr '[:upper:]' '[:lower:]')
experiment_number="$2"
experiment_number_hyphenated="${experiment_number//\./-}"

# Locations of default templates
templates_path="$HOME/bin/conv/templates"
v1_js_template="$templates_path/default/V1.js"
v1_sass_template="$templates_path/default/V1.scss"
v1_tm_template="$templates_path/default/TM-V1.js"

# Swap for client specific templates if they exist
if [ -e "$templates_path/$client_code/V1.js" ]; then
    v1_js_template="$templates_path/$client_code/V1.js"
fi

if [ -e "$templates_path/$client_code/V1.scss" ]; then
    v1_sass_template="$templates_path/$client_code/V1.scss"
fi

if [ -e "$templates_path/$client_code/TM-V1.js" ]; then
    v1_tm_template="$templates_path/$client_code/TM-V1.js"
fi

# If client code equals "EMS" or "INT", add templates for shared, control and variation 2
if [ "$client_code" = "EMS" ] || [ "$client_code" = "INT" ]; then
    shared_js_template="$templates_path/default/SHARED.js"
    control_js_template="$templates_path/default/CONTROL.js"
    control_tm_template="$templates_path/default/TM-CONTROL.js"
    v2_js_template="$templates_path/default/V2.js"
    v2_sass_template="$templates_path/default/V2.scss"
    v2_tm_template="$templates_path/default/TM-V2.js"

    if [ -e "$templates_path/$client_code/SHARED.js" ]; then
        shared_js_template="$templates_path/$client_code/SHARED.js"
    fi

    if [ -e "$templates_path/$client_code/CONTROL.js" ]; then
        control_js_template="$templates_path/$client_code/CONTROL.js"
    fi

    if [ -e "$templates_path/$client_code/TM-CONTROL.js" ]; then
        control_tm_template="$templates_path/$client_code/TM-CONTROL.js"
    fi

    if [ -e "$templates_path/$client_code/V2.js" ]; then
        v2_js_template="$templates_path/$client_code/V2.js"
    fi

    if [ -e "$templates_path/$client_code/V2.scss" ]; then
        v2_sass_template="$templates_path/$client_code/V2.scss"
    fi

    if [ -e "$templates_path/$client_code/TM-V2.js" ]; then
        v2_tm_template="$templates_path/$client_code/TM-V2.js"
    fi
fi

# If client code equals "INT", add template for shared.scss
if [ "$client_code" = "INT" ]; then
    shared_sass_template="$templates_path/default/shared.scss"

    if [ -e "$templates_path/$client_code/shared.scss" ]; then
        shared_sass_template="$templates_path/$client_code/shared.scss"
    fi
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
    cat "$v1_js_template" | sed "$replace_placeholders" >> $experiment_number/variation-1.js 
fi

# Create and populate /dev/scss/variation-1.scss
if [ ! -e "$experiment_number/dev/scss/variation-1.scss" ]; then
    touch $experiment_number/dev/scss/variation-1.scss
    cat "$v1_sass_template" | sed "$replace_placeholders" >> $experiment_number/dev/scss/variation-1.scss
fi

# Create and populate /dev/tm/tm-variation-1.js
if [ ! -e "$experiment_number/dev/tm/tm-variation-1.js" ]; then
    touch $experiment_number/dev/tm/tm-variation-1.js
    cat "$v1_tm_template" | sed "$replace_placeholders" >> $experiment_number/dev/tm/tm-variation-1.js 
fi

# If client code equals "EMS" or "INT", create and populate shared.js, control.js, 
# variation-2.js, variation-2.scss, variation-2.css and tm-variation-2.js
if [ "$client_code" = "EMS" ] || [ "$client_code" = "INT" ]; then
    # Create and populate variation-1.css
    if [ ! -e "$experiment_number/variation-2.css" ]; then
        touch $experiment_number/variation-2.css
    fi

    # Create and populate shared.js
    if [ ! -e "$experiment_number/shared.js" ]; then
        touch $experiment_number/shared.js
        cat "$shared_js_template" | sed "$replace_placeholders" >> $experiment_number/shared.js
    fi

    # Create and populate control.js
    if [ ! -e "$experiment_number/control.js" ]; then
        touch $experiment_number/control.js
        cat "$control_js_template" | sed "$replace_placeholders" >> $experiment_number/control.js
    fi

    # Create and populate /dev/tm/tm-control.js
    if [ ! -e "$experiment_number/dev/tm/tm-control.js" ]; then
        touch $experiment_number/dev/tm/tm-control.js
        cat "$control_tm_template" | sed "$replace_placeholders" >> $experiment_number/dev/tm/tm-control.js
    fi

    # Create and populate variation-2.js
    if [ ! -e "$experiment_number/variation-2.js" ]; then
        touch $experiment_number/variation-2.js
        cat "$v2_js_template" | sed "$replace_placeholders" >> $experiment_number/variation-2.js
    fi

    # Create and populate /dev/scss/variation-2.scss
    if [ ! -e "$experiment_number/dev/scss/variation-2.scss" ]; then
        touch $experiment_number/dev/scss/variation-2.scss
        cat "$v2_sass_template" | sed "$replace_placeholders" >> $experiment_number/dev/scss/variation-2.scss
    fi

    # Create and populate /dev/tm/tm-variation-2.js
    if [ ! -e "$experiment_number/dev/tm/tm-variation-2.js" ]; then
        touch $experiment_number/dev/tm/tm-variation-2.js
        cat "$v2_tm_template" | sed "$replace_placeholders" >> $experiment_number/dev/tm/tm-variation-2.js
    fi
fi

# If client code equals "INT", create and populate shared.scss
if [ "$client_code" = "INT" ]; then
    # Create and populate shared.css
    if [ ! -e "$experiment_number/shared.css" ]; then
        touch $experiment_number/shared.css
    fi

    # Create and populate /dev/scss/shared.scss
    if [ ! -e "$experiment_number/dev/scss/shared.scss" ]; then
        touch $experiment_number/dev/scss/shared.scss
        cat "$shared_sass_template" | sed "$replace_placeholders" >> $experiment_number/dev/scss/shared.scss
    fi
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