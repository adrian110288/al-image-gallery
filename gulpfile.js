var gulp = require('gulp');

// var clean = require('gulp-clean');
// var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var imagemin = require('gulp-imagemin');
var scss = require('gulp-scss');
// var concat = require('gulp-concat');
// var cssnano = require('gulp-cssnano');
// var htmlmin = require('gulp-htmlmin');

gulp.task('scss', function() {

	return gulp.src('src/*.scss').
		pipe(scss(
			{"bundleExec": true}
		)).
		pipe(concat('style.css')).
		pipe(gulp.dest('src/'));
});

gulp.task('watch', function() {
 gulp.watch('src/**/*', ['default']);
});

gulp.task('default', ['scss']);
