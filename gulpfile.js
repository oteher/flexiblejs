var gulp = require('gulp');

var browserSync = require('browser-sync').create();
let reload = browserSync.reload
var stylus = require('gulp-stylus');
var plumber = require('gulp-plumber');

let minifycss = require('gulp-minify-css')//css压缩  
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps')
const concat = require('gulp-concat'); //文件合并 
var rename=require('gulp-rename') //文件更名 
var notify = require('gulp-notify');//提示信息


let dir = 'src/css/**.styl'
let outDir = "./css/"
// Static Server + watching scss/html files
gulp.task('serve', ['stylus'], function() {

  browserSync.init({
    server: {
      baseDir: "./",
      index: 'authLogin.html'
    }
  });

  gulp.watch(dir, ['stylus']);
  gulp.watch("./*.html").on('change', reload);
  gulp.watch("./css/*.css").on('change', reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('stylus', function() {
  return gulp.src(dir)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(outDir))
    // .pipe(browserSync.stream());
    .pipe(reload({ stream: true }));
});

gulp.task('default', ['serve']);