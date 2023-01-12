const fs      = require( "fs" );
const prompts = require( 'prompts' );

const DIR = '.';

const QUESTIONS = [
	{
		type: 'text',
		name: 'namespace',
		message: 'Block Namespace',
		initial: 'acf'
	},
	{
		type: 'text',
		name: 'title',
		message: 'Block Name'
	},
	{
		type: 'text',
		name: 'description',
		message: 'Block description',
		initial: ''
	},
	{
		type: 'text',
		name: 'icon',
		message: 'Dashicon',
		initial: 'dashicons-star-filled'
	}
	];

	exports.acfBlock = function () {

		console.clear();
		console.log( 'Create ACF Block JSON is running...' );
		console.log( '' );
		console.log( 'This will create a new folder in the current directory containing scaffolding for a new WordPress block using Advanced Custom Fields.' );
		console.log( '' );

		(async() => {
			const response = await prompts( QUESTIONS );

			const title         = response.title;
			const slug          = response.title.replace( /\s+/g, '-' ).toLowerCase();
			const namespace     = response.namespace.replace( /\s+/g, '-' ).toLowerCase();
			const qualifiedName = namespace + '/' + slug;
			const folder        = '/' + slug;
			const absolute      = DIR + folder;

			// Create default CSS class, comment out by default.
			const css = '// .wp-block-' + namespace + '-' + slug + ' {}';

			// Create Folder.
			if ( ! fs.existsSync( absolute )) {
				fs.mkdirSync( absolute );
			} else {
				console.log( 'Error: A directory called ' + slug + ' was already found. Aborting.' )
				return;
			}

			// Create CSS.
			fs.writeFile(
				absolute + '/' + slug + '.css',
				css,
				function (error) {
					if (error) {
						console.log( 'Whoops there has been an error writing to the system. Aborting.' );
						throw error;
					} else {
						console.log( `${slug}.css created` );
					}
				}
			);

			// Create SCSS.
			fs.writeFile(
				absolute + '/' + slug + '.scss',
				css,
				function (error) {
					if (error) {
						console.log( 'Whoops there has been an error writing to the system. Aborting.' );
						throw error;
					} else {
						console.log( `${slug}.scss created` );
					}
				}
			);

			// Creating Editor CSS.
			fs.writeFile(
				absolute + '/editor.css',
				css,
				function (error) {
					if (error) {
						console.log( 'Whoops there has been an error writing to the system. Aborting.' );
						throw error;
					} else {
						console.log( `editor.css created` );
					}
				}
			);

			// Creating Editor SCSS.
			fs.writeFile(
				absolute + '/editor.scss',
				css,
				function (error) {
					if (error) {
						console.log( 'Whoops there has been an error writing to the system. Aborting.' );
						throw error;
					} else {
						console.log( `editor.scss created` );
					}
				}
			);

		// Get the PHP template and turn in to PHP.
		let phpTemplate = '/template-php.txt';
		fs.readFile(
			__dirname + phpTemplate,
			'utf8',
			function(err, data) {
				data          = data.replace( 'XYZ', title ).replace( 'QWY', slug ).replace( 'DX9S', namespace );
				let createPHP = fs.createWriteStream( absolute + '/' + slug + '.php' );
				createPHP.write( data );
				createPHP.end();
				console.log( `${slug}.php created` );
			}
		);

		// Get the Block.json template.
		let jsonTemplate = '/template-block.json';
		let raw          = fs.readFileSync( __dirname + jsonTemplate );
		let template     = JSON.parse( raw );

		// Update Block.json values.
		template.name               = qualifiedName;
		template.title              = title;
		template.description        = response.description;
		template.icon               = response.icon;
		template.style              = 'file:./' + slug + '.css';
		template.editorStyle        = 'file:./editor.css';
		template.acf.renderTemplate = slug + '.php';

		let jsonContent = JSON.stringify( template, null, "\t" );
		let createJSON  = fs.createWriteStream( absolute + '/block.json' );
		createJSON.write( jsonContent );
		createJSON.end();
		console.log( 'block.json created' );
		})();
	}
