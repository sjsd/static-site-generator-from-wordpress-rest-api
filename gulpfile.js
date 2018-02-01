'use strict';
const gulp = require('gulp'); // Initial gulp
const sass = require('gulp-sass'); // Build SASS
const babel = require('gulp-babel'); // Babel for JS
const plugins = require('gulp-load-plugins')(); // To handle splits of gulpfile.js
const del = require('del'); // To clean / delete build-folder

// Folders
const config = {
	assetsPath: './assets',
	sassPath: './assets/sass',
	javascriptPath: './assets/javascript',
	nodePath: './node_modules',
	buildPath: './build'
}

function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp, plugins);
}

function defaultTask(done) {
	done();
}

// Delete folder
gulp.task('clean', function(done, path = config.buildPath) {
	del([path]).then(paths => {
		done();
	});
});

// Build CSS
gulp.task('sass', getTask('sass'));

// Build javascript
gulp.task('javascript', getTask('javascript'));

/* Metalsmith, Handlebar and Wordpress */
const wordpressURL = 'staticsitegenerator.wordpress.com';
const sitemapHostname = 'https://www.example.com/';
const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const collections = require('metalsmith-collections');
const permalinks = require('metalsmith-permalinks');
const layouts = require('metalsmith-layouts');
const sitemap = require('metalsmith-sitemap');
const remote = require('metalsmith-remote-json-to-files');
const asset = require('metalsmith-static');
const rootPath = require('metalsmith-rootpath');
const Handlebars = require('handlebars');
const moment = require('moment');
const he = require('he');

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
    const formatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return json.reduce((prev, item) => {
        const filename = `posts/${item.slug}.md`
        return Object.assign(prev, {
            [filename]: {
                layout: __dirname+'/layouts/post.hbs',
                collection: 'posts',
                contents: item.content.rendered,
                title: item.title.rendered,
                excerpt: item.excerpt.rendered,
                description: item.excerpt.rendered,
                featuredImage: item.featured_media_url,
                date: item.date
            }
        })
    }, {})
}

gulp.task('html', function(done) {
	metalsmith(__dirname)
	.metadata({
		site: {
			name: 'Static Site Generator',
			description: "Welcome to my new static generated blog. All content is hosted on Wordpress.",
			generatorname: "Metalsmith",
			generatorurl: "http://metalsmith.io/",
			generatortitle: "Check out Metalsmith!"
		}
	})
	.use(remote({
		url: 'https://public-api.wordpress.com/wp/v2/sites/'+wordpressURL+'/posts', // Insert URL to Wordpress-blog.
		"transformOpts": formatPost
	}))
	.use(collections({
		posts: {
			pattern: './posts/*.md',
			sortBy: 'date',
			reverse: false
		},
		pages: {
			pattern: '*.md',
			sortBy: 'menu-order'
		},
		blogs: {
			sortBy: 'date',
			reverse: true
		}
	}))
	.use(markdown())
	.use(permalinks())
	.use(layouts({
		engine: 'handlebars',
		directory: 'src/layouts',
		default: 'default.hbs',
		partials: 'src/layouts/partials'
	}))
	.use(sitemap({
		hostname: sitemapHostname
	}))
	.use(asset({
		"src": "./assets",
		"dest": "."
	}))
	.use(rootPath())
	.build(function (err) {
		if (err) throw err;
	});
	done();

});

// Task in series
gulp.task('default', defaultTask);
gulp.task('clean-build', gulp.series('clean', 'sass', 'javascript', 'html'));
