# Create ACF Block JSON

Quickly create an ACF Block that utilises block.json

## What does Create ACF Block JSON do

Create ACF Block JSON is an npm package command line program that will create a new folder in your current directory containing scaffolding for a new WordPress block using Advanced Custom Fields.

It will generate:

- Folder - containg folder for your block.
- block.json - prefilled with block information.
- PHP file - setup with basic information, classes and innerblocks.
- SCSS file - useful if you use a compiler to output CSS files.
- CSS file - to edit CSS or be overwritten by your processed SCSS.
- editor.css - dedicated editor styles for block.

The script handles generating a unique class for your block which is then referenced in each file.

## Customisation Options

When you run `create-acf-block-json` you are asked a few questions before your block is created:

- Namespace: Specify a namespace for the block (defaults to `acf`)
- Name: Give your block a name, i.e. "My Cool Block" (required)
- Description: Describe the functionality of your block so editors and users can find it easily (optional)
- Icon: The icon for your block - use any Dashicons name https://developer.wordpress.org/resource/dashicons/ (defaults to `dashboard`)

The script will then generate all required files. From there, you can edit, delete, remove the files as you wish.

## Install Create ACF Block

1. Using terminal or another CLI, download from npm and install as a global package - `npm install -g create-acf-block-json`
2. Using terminal or another CLI, navigate to your WordPress theme folder where you want all of your blocks (we use /wp-content/themes/my-theme/blocks/)
3. Run `create-acf-block-json` and follow prompts.

## TODO:

- Use random icon from dashicons
