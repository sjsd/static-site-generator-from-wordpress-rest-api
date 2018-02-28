const Handlebars = require('handlebars');
const metalsmith = require('gulp-metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const permalinks = require('metalsmith-permalinks');
const collections = require('metalsmith-collections');
const discoverPartials = require('metalsmith-discover-partials');
const moment = require('moment');
const he = require('he');

/* Register Handlebars helpers */
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
	if (typeof(context) != 'undefined' && context != null) {
		let htmlStripped = context.replace(/<\/?[^>]+(>|$)/g, "");
		let htmlEncoded = he.decode(htmlStripped);
		return new Handlebars.SafeString(htmlEncoded);
	}
});

module.exports = function (gulp, plugins, foo) {
	return function (done) {
		gulp.src('src/json/**')
			.pipe(metalsmith({
				metadata: {
					site: {
						name: 'Static Site Generator',
						description: "Welcome to my new static generated blog. This code is a proof of concept to prove that it is possible to use Wordpress as a headless CMS or / and CDN. Visit https://github.com/sjsd/static-site-generator-from-wordpress-rest-api/ for more information.",
						generatorname: "Metalsmith",
						generatorurl: "http://metalsmith.io/",
						generatortitle: "Check out Metalsmith!",
						gitUrl: "https://github.com/sjsd/static-site-generator-from-wordpress-rest-api/"
					}
				},
				json: true,
				use: [
					markdown(),
					permalinks(),
					discoverPartials({
						directory: './src/layouts/partials'
					}),
					layouts({
						engine: 'handlebars',
						directory: './src/layouts',
						default: 'default.hbs'
					}),
					collections({
						post: {
							sortBy: 'date',
							reverse: false,
							layouts: 'post.hbs'
						},
						pages: {
							pattern: './page/*.md',
							sortBy: 'menu-order'
						}
					})
				]
			})
		)
		.pipe(gulp.dest('build'));
		done();
	}
}