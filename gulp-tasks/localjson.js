const wordpressURL = 'staticsitegenerator.wordpress.com';
const metalsmith = require('metalsmith');
const remote = require('metalsmith-remote-json-to-files');
const gulpsmith = require('gulpsmith');
const jsonfile = require('jsonfile');

const wpApiUrl = 'https://public-api.wordpress.com/wp/v2/sites/'+wordpressURL;

function writeJsonFilePage(json) {
	const file = './src/json/page.json';
	const obj = json;

	jsonfile.writeFile(file, obj, function (err) {
		if (err !== null) {
			console.log('Error writing local JSON-file:')
			console.error(err);
		}
	})
}

function writeJsonFilePost(json) {
	const file = './src/json/post.json';
	const temp = {};

	for (const key of Object.keys(json)) {
		temp['post/'+json[key].slug+'.html'] = {
			"id": json[key].id,
			"date": json[key].date,
			"modified": json[key].modified,
			"slug": json[key].slug,
			"status": json[key].publish,
			"type": json[key].type,
			collection: json[key].type,
			"title": json[key].title.rendered,
			"order": json[key].id,
			"layout": json[key].type+'.hbs',
			"contents": json[key].content.rendered,
			"excerpt": json[key].excerpt.rendered,
			"featured_media_url": json[key].featured_media_url,
			"wordpressURL": wordpressURL
		};
	}

	jsonfile.writeFile(file, temp, function (err) {
		if (err !== null) {
			console.log('Error writing local JSON-file:')
			console.error(err);
		}
	})
}

module.exports = function (gulp, plugins, additionalParam) {
	return function (done) {
		if ((additionalParam === undefined) || (additionalParam === 'undefined')) {
			console.log('Additional parameter not set. (pages or posts)');
		}

		if ((additionalParam !== undefined) || (additionalParam !== 'undefined')) {
			if (additionalParam === 'pages') {
				gulp.src("./assets/**/*")
				.pipe(
					gulpsmith()
					.use(remote({
						url: wpApiUrl+'/'+additionalParam,
						"transformOpts": writeJsonFilePage
					}))
				)
				.pipe(gulp.dest("./build"))
			}

			if (additionalParam === 'posts') {
				gulp.src("./assets/**/*")
				.pipe(
					gulpsmith()
					.use(remote({
						url: wpApiUrl+'/'+additionalParam,
						"transformOpts": writeJsonFilePost
					}))
				)
				.pipe(gulp.dest("./build"))
			}
		}
		done();
	};
};