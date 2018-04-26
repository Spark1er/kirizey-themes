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
    server: "./build/"
  });

  gulp.watch("build/**/*.html").on("change", browserSync.reload);
  gulp.watch("build/**/*.css").on("change", browserSync.reload);

  gulp.watch("src/assets/**/*.*", ["dev:build-assets"]);
});

gulp.task("dev:build-assets", function() {
  return gulp.src("src/assets/**/*.*").pipe(gulp.dest("build/assets/"));
});

/* tasks for pages */
gulp.task("dev:build-index-pug", function() {
  return gulp
    .src("src/index.pug")
    .pipe(plumber())
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest("build/index/"))
    .pipe(browserSync.stream());
});
gulp.task("dev:build-index-scss", function() {
  return gulp
    .src("src/index.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest("build/index/"))
    .pipe(browserSync.stream());
});

gulp.task("watch:index", function() {
  gulp.watch("src/components/**/*.pug", ["dev:build-index-pug"]);
  gulp.watch("src/components/**/*.scss", ["dev:build-index-scss"]);
  gulp.watch("src/index.pug", ["dev:build-index-pug"]);
  gulp.watch("src/index.scss", ["dev:build-index-scss"]);
  gulp.watch("src/shared/**/*.pug", ["dev:build-index-pug"]);
  gulp.watch("src/shared/**/*.scss", ["dev:build-index-scss"]);
});

/* watch on all pages */
gulp.task("watch", ["watch:index"]);

/* task for build project */
gulp.task("dev:build-project", [
  "dev:build-assets",
  "dev:build-index-pug",
  "dev:build-index-scss"
]);

gulp.task("default", ["dev:build-project", "watch", "dev:server"]);
