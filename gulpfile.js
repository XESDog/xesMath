/**
 * Created by work on 2017/2/16.
 */
var gulp = require('gulp');
var del = require('del');
// var pug = require('gulp-pug');//html模版
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');//压缩js
// var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var babel = require('gulp-babel');//es6->es2015
var browserify = require('browserify');//require('gulp-browserify');
var rename = require('gulp-rename');
var babelify = new require('babelify');
var buffer = require('vinyl-buffer');

gulp.task('default', ['clean:build', 'convertJS', 'browserify'], function () {


});

gulp.task('clean:build', function () {
    return del(['build']);
});
// gulp.task('convertJS', ['clean:build'], function () {
//     return gulp.src('src/**/*.js')
//         .pipe(babel({presets: ['es2015']}))
//         .pipe(gulp.dest('build'));
// })

gulp.task('browserify:index', /*['convertJS'],*/ function () {
    browserify('./build/sample/index.js'
        // {entries: ['./src/sample/index.js'],}
    )
        .transform(babelify, {
            presets: ["es2015"],
        })
        .bundle()
        .pipe(source())
        .pipe(buffer())
        // .pipe(rename('index.min.js'))
        .pipe(gulp.dest('src/sample'))
})
