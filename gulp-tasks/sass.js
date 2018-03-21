// Build CSS from SASS
module.exports = function (gulp, plugins) {
	return function (done) {
		gulp.src('./app/sass/main.scss')
		.pipe(plugins.sass({
			outputStyle: 'compressed'
		}))
		.pipe(gulp.dest('./build/css'));
		done();
	};
};