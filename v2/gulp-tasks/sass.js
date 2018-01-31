// Build CSS from SASS
module.exports = function (gulp, plugins) {
	return function (done) {
		gulp.src('./assets/sass/**/*.scss')
			.pipe(plugins.sass({
				outputStyle: 'compressed'
			}))
			.pipe(gulp.dest('./build/styles'));
			done();
	};
};