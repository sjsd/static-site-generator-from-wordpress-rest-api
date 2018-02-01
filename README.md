# Static Site Generator
Based on [Wordpress REST API](http://v2.wp-api.org/). Build with [Node](https://nodejs.org/en/), [Metalsmith](http://www.metalsmith.io/), [Handlebars](handlebarsjs.com) and [Gulp](https://gulpjs.com/).

A setup to create a simple and very fast blog / static site based on a Wordpress blog. Some [background information at the blog](https://staticsitegenerator.wordpress.com).

## Getting startet
- Clone th code `git clone https://github.com/sjsd/static-site-generator-from-wordpress-rest-api.git`
- Add URLs to the `./gulp-task/metalsmith.js`. First and second line.
- Install dependencies: `npm install`
- Run the build `gulp clean-build`
- We're done! Your site is now in the `./build` directory.

## Roadmap
Larger than Google Maps

## Thank you!
This code is based on and inspired by [Metalsmith Boilerplate](https://github.com/andreasvirkus/metalsmith-boilerplate). The design is free template from [HTML5 Up](https://html5up.net/story)