'use strict';

const gulp = require('gulp'); // Initial gulp
const sass = require('gulp-sass'); // Build SASS
const del = require('del'); // To clean / delete build-folder

// Folders
const config = {
	assetsPath: './assets',
	sassPath: './assets/sass',
	nodePath: './node_modules',
	buildPath: './build'
}

function defaultTask(done) {
	done();
}

// Delete folder
gulp.task('clean', function(done, path = config.buildPath) {
	del([path]);
	console.log('Done cleaning: '+path);
	done();
});

// Build CSS from SASS
gulp.task('sass', function (done) {
	gulp.src(config.sassPath+'/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(config.buildPath+'/styles'));
	console.log('Done building CSS from SASS');
	done();
});

gulp.task('default', defaultTask);
// gulp.task('clean-build', css);

gulp.task('clean-build', gulp.series('clean', 'sass'));
