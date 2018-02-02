// Build JS
module.exports = function (gulp, plugins) {
	return function (done) {
		gulp.src('./src/javascript/*.js')
			.pipe(plugins.babel({
				presets: ['env']
			}))
			.pipe(gulp.dest('./build/javascript'));
		done();
	};
};