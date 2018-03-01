// Build JS
module.exports = function (gulp, plugins) {
	return function (done) {
		gulp.src('./app/javascript/*.js')
			.pipe(plugins.babel({
				presets: ['env']
			}))
			.pipe(gulp.dest('./build/javascript'));
		done();
	};
};