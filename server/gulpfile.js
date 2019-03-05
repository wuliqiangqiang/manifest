const gulp = require('gulp');
const sass = require('gulp-sass');
const autoPrefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');


gulp.task('sass', function() {
    gulp.src('./public/sass/*.scss') //*表示所有的scss文件
        .pipe(sass())
        .pipe(autoPrefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./public/css'))
});


gulp.task('testHtmlmin', function() {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    gulp.src('./views/*.hbs')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('./views/'));
});


gulp.task('watch', function() {
    gulp.watch('./public/sass/*.scss', ['sass']);
});