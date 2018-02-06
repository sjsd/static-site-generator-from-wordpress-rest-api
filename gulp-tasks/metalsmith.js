const wordpressURL = 'staticsitegenerator.wordpress.com';
const sitemapHostname = 'https://www.example.com/';

const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const collections = require('metalsmith-collections');
const permalinks = require('metalsmith-permalinks');
const layouts = require('metalsmith-layouts');
const discoverPartials = require('metalsmith-discover-partials');
const sitemap = require('metalsmith-sitemap');
const remote = require('metalsmith-remote-json-to-files');
const rootPath = require('metalsmith-rootpath');
const dateFormatter = require('metalsmith-date-formatter');
const Handlebars = require('handlebars');
const moment = require('moment');
const he = require('he');
const gulpsmith = require('gulpsmith');

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
		const filename = `posts/${item.slug}.md`;
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
				publishDate: item.date
			}
		})
	}, {})
}
module.exports = function (gulp, plugins) {
	return function (done) {
		gulp.src("./assets/**/*")
		.pipe(
			gulpsmith()
			.metadata({
				site: {
					name: 'Static Site Generator',
					description: "Welcome to my new static generated blog. This code is a proof of consept to prove that it is possible to use Wordpress as a headless CMS or / and CDN. Visit https://github.com/sjsd/static-site-generator-from-wordpress-rest-api/ for more information.",
					generatorname: "Metalsmith",
					generatorurl: "http://metalsmith.io/",
					generatortitle: "Check out Metalsmith!",
					gitUrl: "https://github.com/sjsd/static-site-generator-from-wordpress-rest-api/"
				}
			})
			.use(remote({
				url: 'https://public-api.wordpress.com/wp/v2/sites/'+wordpressURL+'/posts', // Insert URL to Wordpress-blog.
				"transformOpts": formatPost
			}))
			.use(collections({
				posts: {
					pattern: './post/*.md',
					sortBy: 'date',
					reverse: false
				},
				pages: {
					pattern: './page/*.md',
					sortBy: 'menu-order'
				}
			}))
			.use(markdown())
			.use(permalinks())
			.use(sitemap({
				hostname: sitemapHostname
			}))
			.use(dateFormatter({
				dates: 'publishDate'
			}))
			.use(discoverPartials({
				directory: './src/layouts/partials',
				pattern: /\.hbs$/
			}))
		    .use(layouts({
		        engine: 'handlebars',
		        directory: './src/layouts',
		        default: 'default.hbs',
		    }))
		    .use(rootPath())
		).pipe(gulp.dest("./build"))
		done();
	};
};