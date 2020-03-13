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
const gulpServerIo = require('gulp-server-io');
const clean = require('gulp-clean');
const webserver = require('gulp-webserver');

cssScss.compiler = require('node-sass');

function server() {
    return src('./')
      .pipe(webserver({
        livereload: true,
        directoryListing: true,
        open: true,
        port: 9000,
        fallback: () {
          watch('src/scss/*.css', { delay: 500 }, sass);
          watch('src/js/*.js', { delay: 500 }, javascript);
        }
      }));
};;

function sass() {
  return src('./src/scss/*.scss')
    .pipe(cssScss({
      "bundleExec": true
    }))
    .pipe(cssScss().on('error', cssScss.logError))
    .pipe(dest('./dist/'));

}

function clean_dist() {
  return src('./dist/*', {read: false})
          .pipe(clean());
}

function javascript() {
  return src('src/js/main.js')
    .pipe(rollup({ plugins: [babel(), resolve(), commonjs()] }, 'umd'))
    .pipe(uglify())
    .pipe(dest('dist/'));
}

exports.default = series(
  clean_dist, 
  parallel(sass, javascript), 
  server
);