'use strict';
const gulp = require('gulp');
const del = require('del');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const fs = require('fs');
const metalsmith = require('gulp-metalsmith');
const permalinks = require('metalsmith-permalinks');
const collections = require('metalsmith-collections');

function defaultTask(done) {
	console.log("Run `gulp --tasks` to see available tasks");
	done();
}

gulp.task('clean', function () {
  del('build/**');
});

gulp.task('metalsmith', ['clean'], function () {
  return gulp.src('src/json/**')
    .pipe(metalsmith({
      ignore: 'src/json/*.md',
      json: true,
      use: [
		markdown(),
		permalinks(),
		collections({
				post: {
					sortBy: 'date',
					reverse: false
				}
		}),
        layouts({engine: 'swig'})
      ]
    }))
    .pipe(gulp.dest('build'));
});

// Task in series
gulp.task('default', defaultTask);
