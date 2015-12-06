/*global require: true */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var qunit = require('node-qunit-phantomjs');
var eslint = require('gulp-eslint');

var files = [
	'src/_tics.js',
	'src/_tics.helper.js',
	'src/_tics.functions.js',
	'src/_tics.gaProvider.js'
];

var testFiles = [
	'tests/_tics.helper.tests.js',
	'tests/_tics.tests.js',
	'tests/lib/testHelper.js'
];

gulp.task('lint', function () {
	var allFiles = files.concat(testFiles);
	return gulp.src(allFiles)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('minify', ['lint'], function () {
	gulp.src(files)
		.pipe(concat('_tics.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build'));
});

gulp.task('qunit', ['minify'], function () {
	qunit('tests/runners/testrunner.html', {
		'verbose': false
	});
});

gulp.task('qunit-release', ['qunit'], function () {
	qunit('tests/runners/testrunner-release.html', {
		'verbose': false
	});
});

gulp.task('default', ['lint', 'minify', 'qunit', 'qunit-release']);
