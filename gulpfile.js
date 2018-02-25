'use strict';
const gulp = require('gulp'); // Initial gulp
const sass = require('gulp-sass'); // Build SASS
const babel = require('gulp-babel'); // Babel for JS
const plugins = require('gulp-load-plugins')(); // To handle parts of gulpfile.js
const del = require('del'); // To clean / delete build-folder

// Function for shortcut getting partial gulp task from the ./gulp-tasks -folder
function getTask(task,additionalParam) {
    return require('./gulp-tasks/' + task)(gulp, plugins, additionalParam);
}

function defaultTask(done) {
	done();
}

// Delete folder
gulp.task('clean', function(done, path = './build') {
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

// Get and create local JSONS
gulp.task('local-json-posts', getTask('localjson','posts'));
gulp.task('local-json-pages', getTask('localjson','pages'));

// Task in series
gulp.task('default', defaultTask);
gulp.task('build', gulp.series('clean', 'sass', 'javascript', 'html'));
