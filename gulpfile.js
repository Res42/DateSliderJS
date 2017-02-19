var gulp = require("gulp");
var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var merge = require('merge2');
var appTsProject = ts.createProject("./tsconfig.json");
var testTsProject = ts.createProject("./test/tsconfig.json");

gulp.task("app", function () {
    var app = appTsProject.src()
        .pipe(sourcemaps.init())
        .pipe(appTsProject());

    return merge([
        app.dts.pipe(gulp.dest(".")),
        app.js.pipe(sourcemaps.write(".")).pipe(gulp.dest("."))
    ]);
});

gulp.task("test", function () {
    return testTsProject.src()
        .pipe(sourcemaps.init())
        .pipe(testTsProject()).js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./test"));
});

gulp.task("build", ["app", "test"]);

gulp.task("default", ["build"], function() {
    gulp.watch("src/**/*.ts", ["app"]);
    gulp.watch("test/**/*.ts", ["test"]);
});
