var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  del = require('del'),
  scss = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  cssnano = require('gulp-cssnano'),
  plumber = require('gulp-plumber'),
  notify = require('gulp-notify'),
  autoprefixer = require('gulp-autoprefixer');

var browserSync = require('browser-sync').create();

var errorHandler = function(err) {
	notify.onError({
		title: "Gulp error in " + err.plugin,
		message:  err.toString()
	})(err);
};

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: '.'
		}
	});
});

gulp.task('styles', function() {
	return gulp.src('src/scss/**/*.s*ss')
	.pipe(plumber({ errorHandler: errorHandler }))
	.pipe(sourcemaps.init())
	.pipe(scss())
	.pipe(autoprefixer('last 4 version'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('assets/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('styles-min', ['styles'], function() {
	return gulp.src('assets/css/main.css')
	.pipe(plumber({ errorHandler: errorHandler }))
	.pipe(sourcemaps.init())
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('assets/css'))
	.pipe(browserSync.reload({stream: true}));
})

gulp.task('scripts', function() {
	return gulp.src('src/js/**/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(sourcemaps.init())
	.pipe(concat('all.js'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('assets/js'));
});

gulp.task('scripts-min', ['scripts'], function() {
	return gulp.src('assets/js/all.js')
	.pipe(sourcemaps.init())
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('assets/js'));
});

gulp.task('clean', function() {
  return del(['assets/js', 'assets/css']);
});

gulp.task('default', ['clean', 'styles-min', 'scripts-min']);

gulp.task('watch', ['clean', 'styles-min', 'scripts-min', 'browserSync'], function() {
  gulp.watch('src/scss/**/*.s*ss', ['styles-min']);
  gulp.watch('src/js/**/*.js', ['scripts-min']);
  
});
