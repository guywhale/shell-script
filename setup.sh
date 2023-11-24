#!/bin/sh
# Variables
experiment_code="$2"
hypenated_experiment_code="${experiment_code//\./-}"

# Build files and directories
mkdir $experiment_code $experiment_code/dev
touch $experiment_code/dev/variation-1.scss $experiment_code/variation-1.css $experiment_code/variation-1.js

# Populate SCSS file
cat <<EOF > $experiment_code/dev/variation-1.scss
\$tag: '.cv-$hypenated_experiment_code';

#{\$tag} {

}
EOF