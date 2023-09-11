const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const htmlclean = require('gulp-htmlclean');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const webpHTML = require('gulp-webp-html');
const webpCss = require('gulp-webp-css');
const changed = require('gulp-changed');

gulp.task('clean:docs', function (done) {
  if (fs.existsSync('./docs/')) {
    return gulp.src('./docs/', { read: false })
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

gulp.task('html:docs', function () {
  return gulp.src('./src/*.html')
    .pipe(changed('./docs/'))
    .pipe(plumber(plumberNotifyConfig('Html')))
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(webpHTML())
    .pipe(htmlclean())
    .pipe(gulp.dest('./docs/'))
});

gulp.task('sass:docs', function () {
  return gulp.src(['!./src/scss/_*.scss', './src/scss/*.scss'])
    .pipe(changed('./docs/css/'))
    .pipe(plumber(plumberNotifyConfig('Styles')))
    .pipe(autoprefixer())
    .pipe(sass().on('error', sass.logError))
    .pipe(csso())
    .pipe(gulp.dest('./docs/css/'))
});

// gulp.task('sass:docs', function () {
//   return gulp.src('./src/scss/*.scss')
//     .pipe(changed('./docs/css/'))
//     .pipe(plumber(plumberNotifyConfig('Styles')))
//     .pipe(autoprefixer())
//     .pipe(webpCss())
//     .pipe(sass().on('error', sass.logError))
//     // .pipe(csso())
//     .pipe(gulp.dest('./docs/css/'))
// });

gulp.task('images:docs', function (){
  return gulp.src('./src/images/**/*')
    .pipe(changed('./docs/images/'))
    .pipe(webp())
    .pipe(gulp.dest('./docs/images/'))
    .pipe(gulp.src('./src/images/**/*'))
    .pipe(changed('./docs/images/'))
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest('./docs/images/'))
});

gulp.task('fonts:docs', function (){
  return gulp.src('./src/fonts/**/*')
    .pipe(changed('./docs/fonts/'))
    .pipe(gulp.dest('./docs/fonts/'))
});

gulp.task('js:docs', function () {
  return gulp.src('./src/js/*.js')
    .pipe(changed('./docs/js'))
    .pipe(plumber(plumberNotifyConfig('Js')))
    .pipe(babel())
    .pipe(webpack(require('./../webpack.config.js')))
    .pipe(gulp.dest('./docs/js'))
});



gulp.task('server:docs', function () {
  return gulp.src('./docs/')
    .pipe(server({
      livereload: true,
      open: true,
    }))
});
