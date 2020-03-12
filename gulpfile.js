const { series, parallel, src, dest } = require('gulp');
const cssScss = require('gulp-sass');

css_sass.compiler = require('node-sass');
 
function css_sass() {
  return src('./src/scss/*.scss')
    .pipe(cssScss().on('error', cssScss.logError))
    .pipe(dest('./dist/css'));

}

function clean(cb) {
  // body omitted
  cb();
}

function javascript(cb) {
  // body omitted
  cb();
}

exports.default = series(clean, parallel(css_sass, javascript));