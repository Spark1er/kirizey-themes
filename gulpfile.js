var gulp = require("gulp"),
  browserSync = require("browser-sync").create(),
  sass = require("gulp-sass"),
  pug = require("gulp-pug"),
  plumber = require("gulp-plumber"),
  runSequence = require("run-sequence"),
  autoprefixer = require("gulp-autoprefixer");

/* general tasks */
gulp.task("dev:server", function() {
  browserSync.init({
    server: "./white-theme-build/"
  });

  gulp.watch("white-theme-build/**/*.html").on("change", browserSync.reload);
  gulp.watch("white-theme-build/**/*.css").on("change", browserSync.reload);

  gulp.watch("src/assets/**/*.*", ["dev:white-theme-build-assets"]);
});

gulp.task("dev:white-theme-build-assets", function() {
  return gulp.src("src/assets/**/*.*").pipe(gulp.dest("white-theme-build/assets/"));
});

/* tasks for pages */
gulp.task("dev:white-theme-build-index-pug", function() {
  return gulp
    .src("src/index.pug")
    .pipe(plumber())
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest("white-theme-build/index/"))
    .pipe(browserSync.stream());
});
gulp.task("dev:white-theme-build-index-scss", function() {
  return gulp
    .src("src/index.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest("white-theme-build/index/"))
    .pipe(browserSync.stream());
});

gulp.task("watch:index", function() {
  gulp.watch("src/components/**/*.pug", ["dev:build-index-pug"]);
  gulp.watch("src/components/**/*.scss", ["dev:build-index-scss"]);
  gulp.watch("src/index.pug", ["dev:build-index-pug"]);
  gulp.watch("src/index.scss", ["dev:build-index-scss"]);
  gulp.watch("src/_vars.scss", ["dev:build-index-scss"]);
});

/* watch on all pages */
gulp.task("watch", ["watch:index"]);

/* task for build project */
gulp.task("dev:white-theme-build-project", [
  "dev:white-theme-build-assets",
  "dev:white-theme-build-index-pug",
  "dev:white-theme-build-index-scss"
]);

gulp.task("default", ["dev:white-theme-build-project", "watch", "dev:server"]);
