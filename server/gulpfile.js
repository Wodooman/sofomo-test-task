var gulp = require("gulp");
var del = require('del');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');

gulp.task('clean', function () {
    return del(['dist/**/*']);
});

gulp.task("build", function () {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .js.pipe(sourcemaps.write('.', { sourceRoot: path.relative('dist', 'src'), includeContent: false }))
        .pipe(gulp.dest("dist"));
});

gulp.task('copy-public', function () {
    return gulp.src(['public/**/*'])
        .pipe(gulp.dest('dist/public'));
});

gulp.task("default", gulp.series('clean', 'build', 'copy-public'));