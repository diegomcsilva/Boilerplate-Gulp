const {
  series,
  parallel,
  src,
  dest
} = require('gulp');
const cssScss = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const rollup = require('gulp-better-rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

css_sass.compiler = require('node-sass');

function css_sass() {
  return src('./src/scss/*.scss')
    .pipe(cssScss({
      "bundleExec": true
    }))
    .pipe(cssScss().on('error', cssScss.logError))
    .pipe(dest('./dist/css'));

}

function clean(cb) {
  // body omitted
  cb();
}

function javascript() {
  return src('src/js/main.js')
    .pipe(rollup({ plugins: [babel(), resolve(), commonjs()] }, 'umd'))
    .pipe(uglify())
    .pipe(dest('dist/'));
}

exports.default = series(clean, parallel(css_sass, javascript));