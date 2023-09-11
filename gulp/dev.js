const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const changed = require('gulp-changed');

gulp.task('clean:dev', function (done) {
  if (fs.existsSync('./build/')) {
    return gulp.src('./build/', { read: false })
      .pipe(clean({ force: true }))
  }

  done();
});

const plumberNotifyConfig = (title) => ({
  errorHandler: notify.onError({
    title,
    message: 'Error <%= error.message %>',
    sound: false,
  })
})

gulp.task('html:dev', function () {
  return gulp.src('./src/*.html')
    .pipe(changed('./build/', {hasChanged: changed.compareContents}))
    .pipe(plumber(plumberNotifyConfig('Html')))
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./build/'))
});

gulp.task('sass:dev', function () {
  return gulp.src(['!./src/scss/_*.scss', './src/scss/*.scss'])
    .pipe(changed('./build/css/'))
    .pipe(plumber(plumberNotifyConfig('Styles')))
    .pipe(sourceMaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./build/css/'))
});

gulp.task('images:dev', function (){
  return gulp.src('./src/images/**/*')
    .pipe(changed('./build/images/'))
    .pipe(gulp.dest('./build/images/'))
});

gulp.task('fonts:dev', function (){
  return gulp.src('./src/fonts/**/*')
    .pipe(changed('./build/fonts/'))
    .pipe(gulp.dest('./build/fonts/'))
});

gulp.task('js:dev', function () {
  return gulp.src('./src/js/*.js')
    .pipe(changed('./build/js'))
    .pipe(plumber(plumberNotifyConfig('Js')))
    .pipe(webpack(require('./../webpack.config.js')))
    .pipe(gulp.dest('./build/js'))
});



gulp.task('server:dev', function () {
  return gulp.src('./build')
    .pipe(server({
      livereload: true,
      open: true,
    }))
});

gulp.task('watch:dev', function () {
  gulp.watch('./src/**/*.html', gulp.parallel('html:dev'));
  gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass:dev'));
  gulp.watch('./src/images/**/*', gulp.parallel('images:dev'));
  gulp.watch('./src/fonts/**/*', gulp.parallel('fonts:dev'));
  gulp.watch('./src/js/**/*.js', gulp.parallel('js:dev'));
});
