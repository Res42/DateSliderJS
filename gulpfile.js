var gulp = require("gulp");
var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var merge = require('merge2');
var appTsProject = ts.createProject("./src/tsconfig.json");
var integrationTsProject = ts.createProject("./integration/tsconfig.json");
var testTsProject = ts.createProject("./test/tsconfig.json");
var less = require("gulp-less");
var cleanCss = require("gulp-clean-css");
var rename = require("gulp-rename");

gulp.task("app", function () {
    var app = appTsProject.src()
        .pipe(sourcemaps.init())
        .pipe(appTsProject());

    var integration = integrationTsProject.src()
        .pipe(sourcemaps.init())
        .pipe(integrationTsProject());

    return merge([
        app.dts.pipe(gulp.dest(".")),
        app.js.pipe(sourcemaps.write(".")).pipe(gulp.dest(".")),

        integration.dts.pipe(gulp.dest(".")),
        integration.js.pipe(sourcemaps.write(".")).pipe(gulp.dest(".")),
    ]);
});

gulp.task("css", function() {
    var compileLess = gulp.src("src/date-slider.less")
        .pipe(less());

    return merge([
        compileLess.pipe(gulp.dest(".")),
        compileLess.pipe(cleanCss({compatibility: "ie8"})).pipe(rename({extname: ".min.css"})).pipe(gulp.dest("."))
    ]);
});

gulp.task("test", ["app"], function () {
    return testTsProject.src()
        .pipe(sourcemaps.init())
        .pipe(testTsProject()).js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./test"));
});

gulp.task("default", ["app", "test", "css"]);

gulp.task("watch", function() {
    gulp.watch("src/**/*.ts", ["app"]);
    gulp.watch("integration/**/*.ts", ["app"]);
    gulp.watch("test/**/*.ts", ["test"]);
    gulp.watch("src/**/*.less", ["css"]);
});
