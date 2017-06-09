const gulp        = require('gulp');
const babel       = require('gulp-babel');
const sass        = require('gulp-sass');
const cleanCSS    = require('gulp-clean-css');
const uglify      = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const notify      = require('gulp-notify');
const plumber     = require('gulp-plumber');
const sourcemaps  = require('gulp-sourcemaps');
const nodemon     = require('gulp-nodemon');
const clean       = require('gulp-clean');
const sequence    = require('run-sequence');

function reportError(error) {
  notify({
    title: `Task Failed [${error.plugin}]`,
    message: 'Check the terminal.'
  }).write(error);
  console.log(error.toString());
  this.emit('end');
}

gulp.task('clean', () => {
  return gulp.src('public/**/*', { read: false })
    .pipe(clean());
});

gulp.task('es6', () => {
  return gulp.src('src/js/*.js')
  .pipe(plumber({ errorHandler: reportError }))
  .pipe(sourcemaps.init())
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('public/js'));
});

gulp.task('sass', () => {
  return gulp.src('src/scss/**/*.scss')
  .pipe(plumber({ errorHandler: reportError }))
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(cleanCSS({ compatibility: 'ie8'}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('public/css'));
});

gulp.task('assets', () => {
  return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('public/assets'));
});

gulp.task('serve', sequence('clean', ['es6', 'sass']), () => {
  browserSync.init({
    proxy: 'http://localhost:3000',
    port: 8000,
    files: ['public/**/*.*', 'views/**/*.*'],
    reloadDelay: 500
  });

  return nodemon().on('start', () => browserSync.reload());
});

gulp.task('watch', () => {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/js/*.js', ['es6']);
  gulp.watch('src/assets/**/*', ['assets']);
});

const defaultTask = () => {
  return gulp.start(['serve', 'watch']);
};

gulp.task('build', sequence('clean', ['sass', 'es6', 'assets']));

gulp.task('default', ['build'], defaultTask);
