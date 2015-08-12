var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('build', function () {
  browserify({
    entries: './lib/observable-form.js',
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('observable-form.js'))
  .pipe(gulp.dest('./'));
});

gulp.task('minify', function () {

});

gulp.task('watch', function () {
  gulp.watch('./lib/**/*.js', ['build']);
});
