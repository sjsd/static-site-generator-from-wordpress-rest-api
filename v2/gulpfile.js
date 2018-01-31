'use strict';

const gulp = require('gulp'); // Initial gulp
const sass = require('gulp-sass'); // Build SASS
const babel = require('gulp-babel'); // Babel for JS
const del = require('del'); // To clean / delete build-folder

// Folders
const config = {
	assetsPath: './assets',
	sassPath: './assets/sass',
	javascriptPath: './assets/javascript',
	nodePath: './node_modules',
	buildPath: './build'
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

// Build CSS from SASS
gulp.task('sass', function (done) {
	gulp.src(config.sassPath+'/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		})
		.on('error', sass.logError))
		.pipe(gulp.dest(config.buildPath+'/styles'));
	done();
});

// Build javascript
gulp.task('javascript', function(done) {
	gulp.src(config.javascriptPath +'/main.js')
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(gulp.dest(config.buildPath + '/javascript'));
	done();
});

// Task in series
gulp.task('default', defaultTask);
gulp.task('clean-build', gulp.series('clean', 'sass', 'javascript'));