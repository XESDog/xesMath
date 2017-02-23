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
gulp.task('sample', ['convertJS', 'browserify:line','browserify:lineSegment'], function () {

})

gulp.task('clean:build', function () {
    return del(['build']);
});
gulp.task('convertJS', ['clean:build'], function () {
    return gulp.src('src/**/*.js')
        .pipe(babel({presets: ['es2015']}))
        // .pipe(uglify())
        .pipe(gulp.dest('build'));
})
gulp.task('browserify:line', ['convertJS'], function () {
    gulp.src('build/sample/line.js')
        .pipe(browserify())
        .pipe(rename('line.min.js'))
        .pipe(gulp.dest('src/sample'))
})
gulp.task('browserify:lineSegment', ['convertJS'], function () {
    gulp.src('build/sample/lineSegment.js')
        .pipe(browserify())
        .pipe(rename('lineSegment.min.js'))
        .pipe(gulp.dest('src/sample'))
})
