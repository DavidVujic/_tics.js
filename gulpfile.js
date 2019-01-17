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

var addOnFiles = [
	'src/add-ons/_tics.cms.js'
];

var testFiles = [
	'tests/_tics.helper.tests.js',
	'tests/_tics.tests.js',
	'tests/lib/testHelper.js'
];

gulp.task('lint', function () {
	var allFiles = files.concat(testFiles).concat(addOnFiles);
	return gulp.src(allFiles)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('minify', gulp.series('lint'), function () {
	gulp.src(files)
		.pipe(concat('_tics.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build'));

	gulp.src(addOnFiles)
		.pipe(concat('_tics.cms.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build'));
});

gulp.task('qunit', gulp.series('minify'), function () {
	qunit('tests/runners/testrunner.html', {
		'verbose': false
	});
});

gulp.task('qunit-release', gulp.series('qunit'), function () {
	qunit('tests/runners/testrunner-release.html', {
		'verbose': false
	});
});

gulp.task('default', gulp.series('lint', 'minify', 'qunit', 'qunit-release'));
