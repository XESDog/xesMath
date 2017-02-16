/**
 * Created by work on 2017/2/16.
 */
var gulp = require('gulp');
var del = require('del');
// var pug = require('gulp-pug');//html模版
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');//压缩js
var babel = require('gulp-babel');//es6->es2015
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');

gulp.task('default', ['clean:build', 'convertJS', 'browserify'], function () {


});
gulp.task('clean:build', function () {
    var stream=del(['build'])
    return stream;
});
gulp.task('convertJS',['clean:build'], function (cb) {
    var stream = gulp.src('src/**/*.js')
        .pipe(babel({presets: ['es2015']}))
        .pipe(uglify())
        .pipe(gulp.dest('build'));
    return stream;
})
gulp.task('browserify', ['convertJS'], function () {
    gulp.src('build/Main.js')
        .pipe(browserify())
        .pipe(rename('coniferCone.min.js'))
        .pipe(gulp.dest('build'))
})
