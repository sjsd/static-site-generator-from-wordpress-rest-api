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

// Build javascript
gulp.task('html', getTask('metalsmith'));

// Task in series
gulp.task('default', defaultTask);
gulp.task('clean-build', gulp.series('clean', 'sass', 'javascript', 'html'));
