const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const fileinclude = require("gulp-file-include");
const clean = require("gulp-clean");
const server = require("gulp-server-livereload");
const fs = require("fs");

const startServer = () => {
  return gulp.src("./dist/").pipe(
    server({
      livereload: true,
      open: true,
    }),
  );
};

const cleanFiles = function (done) {
  if (fs.existsSync("./dist/")) {
    return gulp.src("./dist/", { read: false }).pipe(clean());
  }
  done();
};
const htmlCompile = () => {
  return gulp
    .src("./src/pages/*.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      }),
    )
    .pipe(gulp.dest("./dist/"));
};

const scssCompile = () => {
  return gulp
    .src("./src/scss/pages/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./dist/css/"));
};

const images = () => {
  return gulp.src("./src/assets/**/*").pipe(gulp.dest("./dist/assets/"));
};

const videos = () => {
  return gulp.src("./src/assets/*.{mp4,mov}").pipe(gulp.dest("./dist/assets/"));
};

const watchers = () => {
  gulp.watch("./src/pages/**/*.html", gulp.parallel(htmlCompile));
  gulp.watch(
    "./src/scss/**/*.scss",
    { events: "change" },
    gulp.parallel(scssCompile),
  );
  gulp.watch(
    "./src/assets/**/*",
    { events: ["add", "unlink"] },
    gulp.parallel(images),
  );
  gulp.watch(
    "./src/assets/**/*",
    { events: ["add", "unlink"] },
    gulp.parallel(videos),
  );
};

exports.default = gulp.series(
  cleanFiles,
  gulp.parallel(htmlCompile, scssCompile, images, videos),
  gulp.parallel(startServer, watchers),
);
