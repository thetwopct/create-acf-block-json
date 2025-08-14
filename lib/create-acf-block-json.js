const fs = require("fs");
const prompts = require('prompts');

const DIR = '.';

const QUESTIONS = [{
        type: 'text',
        name: 'namespace',
        message: 'Block Namespace',
        initial: 'acf'
    },
    {
        type: 'text',
        name: 'title',
        message: 'Block Name',
        validate: value => (value && value.trim().length > 0) ? true : 'Block Name is required',
        format: value => value.trim()
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
        initial: 'star-filled'
    }
];

exports.acfBlock = function() {

    console.clear();
    console.log('Create ACF Block JSON is running...');
    console.log('');
    console.log('This will create a new folder in the current directory containing scaffolding for a new WordPress block using Advanced Custom Fields.');
    console.log('');
    console.log('Your current directory is: ' + process.cwd());
    console.log('');

    let cancelled = false;

    // Listen for SIGINT signals and set the "cancelled" flag to true.
    process.on('SIGINT', () => {
        console.log('Cancelled.');
        cancelled = true;
    });

    // Helper function for creating files.
    const createFile = async (path, content, successMessage, errorMessage) => {
        try {
            fs.writeFileSync(path, content);
            console.log(successMessage);
        } catch (error) {
            console.error(errorMessage, error);
        }
    };

    // Helper to sanitize slugs and namespaces:
    // - Lowercase
    // - Preserve existing '-'
    // - Convert spaces and '_' to '-'
    // - Remove any other characters (allow only a-z, 0-9, and '-')
    const sanitizeSlug = (value) => {
        if (!value) return '';
        return String(value)
            .toLowerCase()
            .replace(/[ _]+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
    };

    (async () => {
				const response = await prompts(QUESTIONS, {onCancel: () => {cancelled = true}});

				// Check if the user cancelled the prompts.
				if (cancelled) {
					console.log('Aborting...');
					return;
				}

        const title = response.title;
        const slug = sanitizeSlug(response.title);
        const namespace = sanitizeSlug(response.namespace);
        const qualifiedName = namespace + '/' + slug;
        const folder = '/' + slug;
        const absolute = DIR + folder;

        // Create default CSS class.
        const css = '.wp-block-' + namespace + '-' + slug + ' {}';

        // Create Folder.
        if (!fs.existsSync(absolute)) {
            fs.mkdirSync(absolute);
        } else {
            console.log('Error: A directory called ' + slug + ' was already found. Aborting.')
            return;
        }

        // Handle cancellation.
        if (cancelled) {
            console.log('Aborting.');
            return;
        }

        // Create files.
        await createFile(
            absolute + '/' + slug + '.css',
            `/* ${css} */`,
            `${slug}.css created`,
            'Error creating CSS file:'
        );
        await createFile(
            absolute + '/' + slug + '.scss',
            `// ${css}`,
            `${slug}.scss created`,
            'Error creating SCSS file:'
        );
        await createFile(
            absolute + '/editor.css',
            `/* ${css} */`,
            `editor.css created`,
            'Error creating editor CSS file:'
        );
        await createFile(
            absolute + '/editor.scss',
            `// ${css}`,
            `editor.scss created`,
            'Error creating editor SCSS file:'
        );

        // Handle cancellation.
        if (cancelled) {
            console.log('Aborting.');
            return;
        }

        // Get the PHP template and turn in to PHP.
        let phpTemplate = '/template-php.txt';
        try {
            let data = fs.readFileSync(__dirname + phpTemplate, 'utf8');
            data = data.replace(/XYZ/g, title)
						.replace(/QWY/g, slug)
						.replace(/DX9S/g, namespace)
						.replace(/\r\n/g, '\n');
				await createFile(
						absolute + '/' + slug + '.php',
						data,
						`${slug}.php created`,
						'Error creating PHP template:'
				);
		} catch (error) {
				console.error('Error creating PHP template:', error);
		}

		// Handle cancellation.
		if (cancelled) {
				console.log('Aborting.');
				return;
		}

		// Get the Block.json template.
		let jsonTemplate = '/template-block.json';
		try {
				let raw = fs.readFileSync(__dirname + jsonTemplate);
				let template = JSON.parse(raw);
				// Update Block.json values.
				template.name = qualifiedName;
				template.title = title;
				template.description = response.description;
				template.icon = response.icon;
				template.style = 'file:./' + slug + '.css';
				template.editorStyle = 'file:./editor.css';
				template.acf.renderTemplate = slug + '.php';
				let jsonContent = JSON.stringify(template, null, "\t");
				await createFile(
						absolute + '/block.json',
						jsonContent,
						'block.json created',
						'Error creating JSON template:'
				);
		} catch (error) {
				console.error('Error creating JSON template:', error);
		}

})();
}
