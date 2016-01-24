/////////////////////////////////////////////////////////////////////////////
// 変数
/////////////////////////////////////////////////////////////////////////////

var gulp         = require("gulp");
var plumber      = require("gulp-plumber");
var sass         = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var csscomb      = require('gulp-csscomb');
var prettify     = require('gulp-prettify');
var htmlhint     = require("gulp-htmlhint");
var imagemin     = require('gulp-imagemin');
var pngquant     = require('imagemin-pngquant');


/////////////////////////////////////////////////////////////////////////////
// SASS
/////////////////////////////////////////////////////////////////////////////

gulp.task("sass", function() {
  gulp.src("sass/**/*scss")
    .pipe(plumber())　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　//Watch解除防止
    .pipe(sass())                                          //SASSコンパイル
    .pipe(autoprefixer())                                  //接頭辞付与
    .pipe(gulp.dest("./css"));
});


/////////////////////////////////////////////////////////////////////////////
// CSS
/////////////////////////////////////////////////////////////////////////////

gulp.task('css', function() {
  return gulp.src("css/**/*css")
    .pipe(csscomb())                                        //css整形
    .pipe(gulp.dest("./css"));
});


/////////////////////////////////////////////////////////////////////////////
// HTML
/////////////////////////////////////////////////////////////////////////////

gulp.task('html', function() {
  gulp.src('./*.html')
    .pipe(prettify({indent_size: 2}))                       //html整形
    .pipe(htmlhint())                                       //html文法チェック
    .pipe(htmlhint.reporter())
    .pipe(gulp.dest('./'));
});


/////////////////////////////////////////////////////////////////////////////
// Images
/////////////////////////////////////////////////////////////////////////////

gulp.task('imgMin', function() {
  return gulp.src('img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img'));
});


/////////////////////////////////////////////////////////////////////////////
// Watch
/////////////////////////////////////////////////////////////////////////////

gulp.task("default", function() {
    gulp.watch(["js/**/*.js","!js/min/**/*.js"],["js"]);
    gulp.watch("sass/**/*.scss",["sass"]);
    gulp.watch("css/**/*.css",["css"]);
    gulp.watch("./*.html",["html"]);
});