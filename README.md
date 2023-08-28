# Create ACF Block JSON

> Quickly create a new [WordPress](https://wordpress.org) Block that uses [Advanced Custom Fields](https://www.advancedcustomfields.com) (ACF) and utilises block.json and block-specific CSS and PHP files.

If you use ACF and make Gutenberg blocks, this simple utility should save you time scaffolding custom blocks.

<img src="screenshot.gif" width="630">

## Quick Start

Install globally via npm:

```sh
npm install --global create-acf-block-json
```

then navigate to where you want your block to be (i.e. /theme/blocks/), and run:

```
$ create-acf-block-json
```

## What does Create ACF Block JSON do

Create ACF Block JSON is an npm package command line program that will create a new folder in your current directory containing scaffolding for a new WordPress block using Advanced Custom Fields.

It will generate:

- Folder - containing folder for your block.
- block.json - prefilled with common block information and default values.
- PHP file - setup with basic information, classes and innerblocks.
- SCSS files - for the frontend and editor. SCSS is useful if you use a compiler to output CSS files.
- CSS file - for the frontend and editor. To write straight CSS or be overwritten by your processed SCSS.

The script handles generating a unique class (.wp-block-namespace-name) for your block which is then referenced in each file.

This script doesn't handle registration of the block - we recommend directory scanning methods to auto load blocks without registering each one. This method is outlined by [Bill Erickson](https://www.billerickson.net/building-acf-blocks-with-block-json/#advanced-usage), but there are [other examples](https://github.com/cncf/cncf.io/blob/0233ccfa1fb24d46ce119049b010a18a0e3d91d3/web/wp-content/themes/cncf-twenty-two/includes/acf.php#L19) online. This blog post by ACF also talks about how to register an ACF block, [follow this guide](https://www.advancedcustomfields.com/resources/how-to-upgrade-a-legacy-block-to-block-json-with-acf-6/). FYI, many guides are out of date, make sure you use guides released after 28th September 2022 (when ACF 6.0 was released) which will properly use block.json. If you want a very quick bit of PHP to register your new block, you can use this:

```
/**
 * Load My Create ACF Block JSON Blocks
 */
function thetwopct_load_acf_blocks() {
        register_block_type( get_template_directory() . '/blocks/my-acf-block/block.json' );
      // register_block_type( get_template_directory() . '/blocks/another-block/block.json' );
}
add_action( 'init', 'thetwopct_load_acf_blocks' );
````

## Customisation Options

When you run `create-acf-block-json` you are asked a few questions before your block is created:

- Namespace: Specify a namespace for the block (defaults to `acf`)
- Name: Give your block a name, i.e. "My Cool Block" (required)
- Description: Describe the functionality of your block so editors and users can find it easily (optional)
- Icon: The icon for your block - use any [Dashicons](https://developer.wordpress.org/resource/dashicons/) name (defaults to icon `star-filled`). Note, when copying the name of the Dashicon you must remove the prefix `dashicons-`, for example: `dashicons-smiley` should be written as `smiley`.

The script will then generate all required files. From there, you can edit, delete, remove the files as you wish.

## Install Create ACF Block

1. Using terminal or another CLI, download from npm and install as a global package - `npm install -g create-acf-block-json`
2. Using terminal or another CLI, navigate to your WordPress theme folder where you want all of your blocks (we use /wp-content/themes/my-theme/blocks/)
3. Run `create-acf-block-json` and follow prompts.

## Update Create ACF Block

To update to the latest version you can just run the install command again - `npm install -g create-acf-block-json`

## Feedback and issues

Please open an issue in the [GitHub repo](https://github.com/thetwopct/create-acf-block-json/issues). Thanks.
