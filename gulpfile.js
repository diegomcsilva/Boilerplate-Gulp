const {
  series,
  parallel,
  src,
  dest,
  watch
} = require('gulp');
const cssScss = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const rollup = require('gulp-better-rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const clean = require('gulp-clean');
const webserver = require('gulp-webserver');
const imageTools = require('gulp-image');

cssScss.compiler = require('node-sass');

function server() {
  return src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true,
      port: 9000,
    }));
};;

function image() {
  return src('./src/image/*')
    .pipe(imageTools())
    .pipe(dest('./dest'));
}

function sass() {
  return src('./src/scss/*.scss')
    .pipe(cssScss({
      "bundleExec": true
    }))
    .pipe(cssScss().on('error', cssScss.logError))
    .pipe(dest('./dest/'));

}

function clean_dest() {
  return src('./dest/*', {
      read: false
    })
    .pipe(clean());
}

function javascript() {
  return src('src/js/main.js')
    .pipe(rollup({
      plugins: [babel(), resolve(), commonjs()]
    }, 'umd'))
    .pipe(uglify())
    .pipe(dest('dest/'));
}

function watch_files() {
  clean_dest();
  watch('src/scss/*.scss', {
    delay: 500
  }, sass);
  watch('src/js/*.js', {
    delay: 500
  }, javascript);
  image();
  server();
};

exports.default = series(
  clean_dest,
  image,
  parallel(sass, javascript),
  watch_files,
  server
);