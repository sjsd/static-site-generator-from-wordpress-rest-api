'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');

const fs = require('file-system');
const del = require('del');

const config = {
	assetsPath: './assets',
	sassPath: './assets/sass',
	nodePath: './node_modules',
	buildPath: './build'
}

function defaultTask(done) {
	done();
}

gulp.task('clean', function(done, path = config.buildPath) {
	del([path]).then(paths => {
		console.log('Folder deleted: '+ path);
	});
	done();
});

gulp.task('sass', function () {
  return gulp.src(config.sassPath+'/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.buildPath+'/styles'));
});

gulp.task('default', defaultTask);
// gulp.task('clean-build', css);