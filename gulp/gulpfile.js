/*global require: true */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var qunit = require('node-qunit-phantomjs');

gulp.task('minify', function () {
	var files = [
		'../_tics.js', '../_tics.helper.js',
		'../_tics.functions.js',
		'../_tics.gaProvider.js'
	];

	gulp.src(files)
		.pipe(concat('_tics.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('../'));
});

gulp.task('qunit', function () {
	qunit('../tests/testrunner.html', {
		'verbose': false
	});
});

gulp.task('qunit-release', ['minify'], function () {
	qunit('../tests/testrunner-release.html', {
		'verbose': false
	});
});

gulp.task('default', ['minify', 'qunit', 'qunit-release']);
