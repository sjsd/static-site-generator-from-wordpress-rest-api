const wordpressURL = 'staticsitegenerator.wordpress.com';
const metalsmith = require('metalsmith');
const remote = require('metalsmith-remote-json-to-files');
const gulpsmith = require('gulpsmith');
const jsonfile = require('jsonfile');

const wpApiUrl = 'https://public-api.wordpress.com/wp/v2/sites/'+wordpressURL+'/';

function writeJsonFilePost(json) {
	console.log('Write post.json');
	const file = './src/json/post.json';
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
				url: wpApiUrl+'posts',
				"transformOpts": writeJsonFilePost
			}))
		)
		.pipe(gulp.dest("./build"))
		done();
	};
};