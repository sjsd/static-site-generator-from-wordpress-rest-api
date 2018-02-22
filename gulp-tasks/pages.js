const wordpressURL = 'staticsitegenerator.wordpress.com';
const metalsmith = require('metalsmith');
const remote = require('metalsmith-remote-json-to-files');
const gulpsmith = require('gulpsmith');
const jsonfile = require('jsonfile');

const wpApiUrl = 'https://public-api.wordpress.com/wp/v2/sites/'+wordpressURL+'/';

function writeJsonFilePage(json) {
	console.log('Write page.json');
	const file = './src/json/page.json';
	const obj = json;

	jsonfile.writeFile(file, obj, function (err) {
		console.error(err)
	})
}

module.exports = function (gulp, plugins) {
	return function (done) {
		gulp.src("./assets/**/*")
		.pipe(
			gulpsmith()
			.use(remote({
				url: wpApiUrl+'pages',
				"transformOpts": writeJsonFilePage
			}))
		)
		.pipe(gulp.dest("./build"))
		done();
	};
};