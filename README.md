## Requirements
- Mac only at the moment (probably works on Linux but haven't tested)
- Node JS installed

## Installation
1. Open a terminal and create a folder called bin/ in your home directory.

    `mkdir ~/bin`

2. Change into your newly created directory and clone this repo inside it.
    
    `cd ~/bin`
    
    `git clone https://github.com/guywhale/conv.git`

3. Next add `conv` to your `$PATH` in order to use it as a shell command in the terminal. To do this open the `~/.zshrc` shell config file using your editor of choice. Then copy and paste the following at the bottom of the file.

    ```
    # Set up Conversion shell script
    export PATH=$PATH:~/bin/conv
    ```
4. Once you have saved and exited the file, you will need to quit and restart your terminal in order for `conv` to start working.

## How to use
In the terminal, navigate to the client folder you where you want to create an experiment.

Then type:

`conv {CLIENT_CODE} {EXPERIMENT_NUMBER}`

This should create a new folder with the experiment number you need with all the files needed and SASS up and running.

SASS is initiated in watch mode, so you can amend the SCSS file directly, save and it will immediately compile into the CSS file.

### Example:
`conv WTR 4.9`

This will create the following structure:
    

```
4.9
├── variation-1.css
├── variation-1.js
└── dev
    ├── scss
    ├  └── variation-1.scss
    └── tm
        └── tm-variation-1.js
```

The files should be populated with the correct template (see below) and all references to the client code and experiment number applied automatically where needed.

## Templates
Templates can be found in `~/bin/conv/templates/default`.

There are currently three available:
1) `V1.scss` - the template for your `variation-1.scss` file. This will compile to `variation-1.css`

2) `V1.js` - the template for you `variation-1.js` file.

3) `TM.js` the template for your Tamper Monkey config file.

You can customize these templates to fit your needs. There a four placeholders available to pass the client code and experiment number into the template file.
1) `<<<CLIENT_CODE>>>` - the client code in uppercase e.g. `WTR`
2) `<<<CLIENT_CODE_LOWERCASE>>>` - the client code in lowercase, useful for constructing CSS classes e.g. `wtr`
3) `<<<EXPERIMENT_NUMBER>>>` - the number you typed into the terminal e.g. `4.9`
4) `<<<EXPERIMENT_NUMBER_HYPHENATED>>>` - takes the experiment number and replaces '.' with '-', useful for constructing CSS classes e.g. `4-9`

### Client Specific Templates
It is possible to have tempates that are only used when a specific client code is detected.

To do this, simply create a new directory in `~/bin/conv/templates` and give it the uppercase code of the client you want to create custom templates for e.g. `~/bin/conv/templates/WTR`

Then copy any template files from `~/bin/conv/templates/default` you wish to override for this client and customize them to your needs.

The default template will be overridden when you run the command in the terminal.

To demonstrate this try creating an experiment folder using:

`conv DEMO 3.2`

Notice that the default template in `~/bin/conv/templates/default/V1.js` has been overridden by the custom template that exists in `~/bin/conv/templates/DEMO/V1.js`.

That's it for now, enjoy!