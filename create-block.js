const fs      = require( "fs" );
const prompts = require( 'prompts' );

	// Temporary testing folder.
	var dir = '../blocks';
	// Run from the theme root directory.
	// var dir = './blocks';

	console.clear();

	console.log( 'Create ACF block is running...' )

if ( ! fs.existsSync( dir )) {
	console.log( 'Error: A directory called /blocks/ was not found in your themes root folder. Create it.' )
	return;
}

	const questions = [
	{
		type: 'text',
		name: 'namespace',
		message: 'Block Namespace',
		initial: 'ttp'
	},
	{
		type: 'text',
		name: 'name',
		message: 'Block Name'
	},
	{
		type: 'text',
		name: 'description',
		message: 'Block Description',
		initial: ''
	},
	{
		type: 'text',
		name: 'icon',
		message: 'Dashicon',
		initial: 'dashboard'
	}
	];

	(async() => {
		const response = await prompts( questions );

		const title         = response.name;
		const lowercaseName = response.name.replace( /\s+/g, '-' ).toLowerCase();
		const namespace     = response.namespace + '/' + lowercaseName;
		const folder        = '/' + lowercaseName;
		const absolute      = dir + folder;

		// create the new folder first.
		if ( ! fs.existsSync( absolute )) {
			fs.mkdirSync( absolute );
		} else {
			console.log( 'Error: A directory called ' + lowercaseName + ' was already found in the blocks directory.' )
			return;
		}

		fs.writeFile(
			absolute + '/' + lowercaseName + '.css',
			'',
			function (error) {
				if (error) {
					console.log( 'Whoops there has been an error. Delete the folder and start again.' );
					throw error;
				} else {
					console.log( `${lowercaseName}.css created` );
				}
			}
		);

	fs.writeFile(
		absolute + '/' + lowercaseName + '.scss',
		'.wp-block-acf-' + lowercaseName + '{}',
		function (error) {
			if (error) {
				console.log( 'Whoops there has been an error. Delete the folder and start again.' );
				throw error;
			} else {
				console.log( `${lowercaseName}.scss created` );
			}
		}
	);
		fs.writeFile(
			absolute + '/editor.css',
			'',
			function (error) {
				if (error) {
					console.log( 'Whoops there has been an error. Delete the folder and start again.' );
					throw error;
				} else {
					console.log( `editor.css created` );
				}
			}
		);

	fs.writeFile(
		absolute + '/editor.scss',
		'@import "../../source/scss/core/variables";	@import "../../source/scss/core/extends";@import "../../source/scss/core/normalize";@import "../../source/scss/core/reset";.wp-block-acf-' + lowercaseName + '{}',
		function (error) {
			if (error) {
				console.log( 'Whoops there has been an error. Delete the folder and start again.' );
				throw error;
			} else {
				console.log( `editor.scss created` );
			}
		}
	);

		// Get the PHP template.
		let phpTemplate = 'template-php.txt';
		fs.readFile(
			phpTemplate,
			'utf8',
			function(err, data) {
				data          = data.replace( 'XYZ', title ).replace( 'QWY', lowercaseName )
				let createPHP = fs.createWriteStream( absolute + '/' + lowercaseName + '.php' );
				createPHP.write( data );
				createPHP.end();
				console.log( `${lowercaseName}.php created` );
			}
		);

			// Get the Block.json template.
			let jsonTemplate = 'template-block.json';
			let raw          = fs.readFileSync( jsonTemplate );
			let template     = JSON.parse( raw );
			// Update Block.json values.
			template.name               = namespace;
			template.title              = title;
			template.description        = response.description;
			template.icon               = response.icon;
			template.style              = 'file:./' + lowercaseName + '.css';
			template.editorStyle        = '[ file:./' + lowercaseName + '.css, file:./editor.css ]';
			template.acf.renderTemplate = lowercaseName + '.php';
			let jsonContent             = JSON.stringify( template, null, "\t" );
			let createJSON              = fs.createWriteStream( absolute + '/block.json' );
			createJSON.write( jsonContent );
			createJSON.end();
			console.log( 'block.json created' );
			console.log( `Your block - ${title} has been created.` )
	})();
