const fs = require('file-system');
const sass = require('node-sass');
const del = require('del');

function removeFolder(path) {
	del([path]).then(paths => {
		console.log('Deleted: '+ path);
	});
}

function buildSass() {
	sass.render({
		file: 'assets/sass/screen.scss',
		outputStyle: 'compressed'
	}, function(err, result) {
		if (!err) {
			fs.writeFile('build/styles/screen.css', result.css, function(err) {
				if (!err) {
					console.log('The CSS was successfully made');
				} else {
					console.log('Something went wong writing CSS-file:');
					console.log(err.message);
				}
			});
		} else {
			console.log('Something went wrong creating CSS-file:');
			console.log(err.message);
		}
	});
}

module.exports.removeFolder = removeFolder;
module.exports.buildSass = buildSass;

// removeFolder('build/');