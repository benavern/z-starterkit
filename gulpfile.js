var gulp   = require('gulp');
var del  = require('del');
var uglify = require('gulp-uglify');
var sass   = require('gulp-sass');
var jade   = require('gulp-jade');
var browserSync = require('browser-sync').create();


// the default task
gulp.task('default', [
  'build',
  'watch'
]);

gulp.task('build', [
  'jade',
  'scripts',
  'styles'
])

// jade templating
gulp.task('jade', function() {
  gulp.src('dev/index.jade')
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
})


// minify && concat scripts
gulp.task('scripts', function() {
  gulp.src('dev/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});


// minify && concat styles
gulp.task('styles', function() {
  gulp.src('dev/css/**/*.sass')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});


// watch the files
gulp.task('watch', function() {
  browserSync.init({
    server: "dist/"
  });
  gulp.watch('dev/**/*.jade', ['jade']);
  gulp.watch('dev/js/*.js', ['scripts']);
  gulp.watch('dev/css/**/*.sass', ['styles']);
});


gulp.task('clean', function() {
  del.sync('dist/');
});

gulp.task('rebuild', ['clean', 'build']);
