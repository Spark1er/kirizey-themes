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
    server: "./black-theme-build/"
  });

  gulp.watch("black-theme-build/**/*.html").on("change", browserSync.reload);
  gulp.watch("black-theme-build/**/*.css").on("change", browserSync.reload);

  gulp.watch("src/assets/**/*.*", ["dev:black-theme-build-assets"]);
});

gulp.task("dev:black-theme-build-assets", function() {
  return gulp.src("src/assets/**/*.*").pipe(gulp.dest("black-theme-build/assets/"));
});

/* tasks for pages */
gulp.task("dev:black-theme-build-index-pug", function() {
  return gulp
    .src("src/index.pug")
    .pipe(plumber())
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest("black-theme-build/index/"))
    .pipe(browserSync.stream());
});
gulp.task("dev:black-theme-build-index-scss", function() {
  return gulp
    .src("src/index.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest("black-theme-build/index/"))
    .pipe(browserSync.stream());
});

gulp.task("watch:index", function() {
  gulp.watch("src/components/**/*.pug", ["dev:build-index-pug"]);
  gulp.watch("src/index.pug", ["dev:build-index-pug"]);
  gulp.watch("src/index.scss", ["dev:build-index-scss"]);
  gulp.watch("src/_vars.scss", ["dev:build-index-scss"]);
  gulp.watch("src/default-theme.scss.scss", ["dev:build-index-scss"]);
});

/* watch on all pages */
gulp.task("watch", ["watch:index"]);

/* task for build project */
gulp.task("dev:black-theme-build-project", [
  "dev:black-theme-build-assets",
  "dev:black-theme-build-index-pug",
  "dev:black-theme-build-index-scss"
]);

gulp.task("default", ["dev:black-theme-build-project", "watch", "dev:server"]);
