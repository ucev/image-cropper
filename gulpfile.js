const gulp = require('gulp');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const minifyCss = require('gulp-minify-css');

gulp.task("scripts", function () {
  return browserify("./src/js/image-cropper.js", {
    standalone: "Cropper"
  }).transform("babelify", { presets: ["es2015"] })
    .bundle()
    .pipe(source("cropper.js"))
    .pipe(gulp.dest("dist/js"))
});


gulp.task("scripts-prod", ["scripts"], function () {
  return gulp.src("./dist/js/cropper.js")
    .pipe(concat("cropper.min.js"))
    .pipe(uglify())
    .pipe(buffer())
    .pipe(gulp.dest("./dist/js"));
})

gulp.task("styles", function () {
  return gulp.src("./src/css/image-cropper.css")
    .pipe(rename("cropper.css"))
    .pipe(gulp.dest("dist/css"))
})

gulp.task("styles-prod", function () {
  return gulp.src("./dist/css/cropper.css")
    .pipe(concat("./cropper.min.css"))
    .pipe(minifyCss())
    .pipe(buffer())
    .pipe(gulp.dest("./dist/css"));
})

gulp.task("auto", function () {
  gulp.watch(["src/js/**/*.js", "src/css/*"], ["scripts", "styles"]);
})

gulp.task("dev", ["scripts", "styles", "auto"]);
gulp.task("prod", ["scripts-prod", "styles-prod"]);