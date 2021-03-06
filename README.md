# Static Site Generator
## Description
Based on [Wordpress REST API](http://v2.wp-api.org/). Build with [Node](https://nodejs.org/en/), [Metalsmith](http://www.metalsmith.io/), [Handlebars](handlebarsjs.com) and [Gulp](https://gulpjs.com/).

A setup to create a simple and very fast blog / static site based on a Wordpress blog. Some [background information at the blog](https://staticsitegenerator.wordpress.com).

## Getting startet
- Clone the code `git clone https://github.com/sjsd/static-site-generator-from-wordpress-rest-api.git`
- Add URLs to the `./gulp-task/localjson.js`. First line.
- Install dependencies: `npm install`
- Build local JSON for post `gulp json-posts`
- Build local JSON for pages `gulp json-pages`
- Run a clean build `gulp build`
- We're done! Your site is now in the `./build` folder.

### Some options
**Where do I set URL to my Wordpress?**
Open `./gulp-task/localjson.js` and change the variable for *wordpressURL*. Like this: `const wordpressURL = 'your-wordpress-blog.wordpress.com'`.

Note: it can be self hosted installation. Then you set something like this *www.your-domain-name.com*

**Are you kidding me? The posts order the wrong way!**
Yeah, well .. you can change that. Open `./gulp-task/metalsmith.js` and find the options for collections. Change the value to true. Like this: `reverse: true`.

**I want my own design**
Go ahead! Knock your self out! The script use [Metalsmith](http://www.metalsmith.io/) and [Handlebars](handlebarsjs.com). Or you can change the script to use what ever you prefer.

## Roadmap
Larger than Google Maps

## Thank you!
This code is based on and inspired by [Metalsmith Boilerplate](https://github.com/andreasvirkus/metalsmith-boilerplate). The design is free template from [HTML5 Up](https://html5up.net/story)