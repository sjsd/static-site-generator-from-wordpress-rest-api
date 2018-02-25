const sitemapHostname = 'https://www.example.com/';
// const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const collections = require('metalsmith-collections');
const permalinks = require('metalsmith-permalinks');
const layouts = require('metalsmith-layouts');
const discoverPartials = require('metalsmith-discover-partials');
const sitemap = require('metalsmith-sitemap');
const remote = require('metalsmith-remote-json-to-files');
const json_to_files = require('metalsmith-json-to-files');
const rootPath = require('metalsmith-rootpath');
const dateFormatter = require('metalsmith-date-formatter');
const Handlebars = require('handlebars');
const moment = require('moment');
const he = require('he');
const gulpsmith = require('gulpsmith');
const metalsmith = require('gulp-metalsmith');


Handlebars.registerHelper('is', function (value, test, options) {
	if (value === test) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
});

Handlebars.registerHelper('date', function (date) {
	return moment(date, "MM-DD-YYYY").format('Do MMM \'YY');
});

Handlebars.registerHelper('if_even', function(conditional, options) {
  if((conditional % 2) == 0) {
	return options.fn(this);
  } else {
	return options.inverse(this);
  }
});

Handlebars.registerHelper('strip-html', function(context) {
  let htmlStripped = context.replace(/<\/?[^>]+(>|$)/g, "");
  let htmlEncoded = he.decode(htmlStripped);
  return new Handlebars.SafeString(htmlEncoded);
});

function formatPost(json) {
	return json.reduce((prev, item) => {
		const filename = `post/${item.slug}.md`;
		const template = 'post.hbs';
		const collection = 'post';
		return Object.assign(prev, {
			[filename]: {
				layout: template,
				collection: collection,
				contents: item.content.rendered,
				title: item.title.rendered,
				excerpt: item.excerpt.rendered,
				description: item.excerpt.rendered,
				featuredImage: item.featured_media_url,
				publishDate: item.date,
				date: item.date
			}
		})
	}, {})
}

function formatPage(json) {
	return json.reduce((prev, item) => {
		const filename = `page/${item.slug}.md`;
		const template = 'page.hbs';
		const collection = 'page';
		return Object.assign(prev, {
			[filename]: {
				layout: template,
				contents: item.content.rendered,
				title: item.title.rendered,
				description: item.excerpt.rendered,
				featuredImage: item.featured_media_url
			}
		})
	}, {})
}

module.exports = function (gulp, plugins) {
	return function (done) {
		gulp.src("./src/json/**")
			.pipe(metalsmith({
				root: '.',
				use: [
  					json_to_files({
						"source_path": "./src/json/post.json"
					}),
					markdown(),
					layouts({
						engine: 'handlebars',
						directory: './src/layouts',
						default: 'post.hbs'
					}),
				],
				json: false

			}))
			.pipe(gulp.dest('./build'));
			done();

	};
};