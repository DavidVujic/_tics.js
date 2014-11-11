/*global require: true */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var qunit = require('node-qunit-phantomjs');

gulp.task('minify', function () {	
	gulp.src(['../_tics.js','../_tics.helper.js', '../_tics.functions.js', '../_tics.gaProvider.js'])
		.pipe(concat('_tics.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('../release'));
});

gulp.task('qunit', function() {
    qunit('../tests/testrunner.html', { 'verbose': true });
});

gulp.task('qunit-release', function() {
    qunit('../tests/testrunner-release.html', { 'verbose': true });
});

gulp.task('default', ['minify', 'qunit', 'qunit-release']);