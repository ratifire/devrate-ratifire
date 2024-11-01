const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const fileinclude = require("gulp-file-include");
const clean = require("gulp-clean");
const server = require("gulp-server-livereload");
const fs = require("fs");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const replace = require("gulp-replace");

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
    .src([
      "./src/scss/pages/*.scss",
      "./node_modules/swiper/swiper-bundle.min.css",
    ])
    .pipe(sass())
    .pipe(gulp.dest("./dist/css/"));
};

const compileJs = (src, dest, concatName = null) => {
  let stream = gulp.src(src).pipe(sourcemaps.init());

  if (concatName) {
    stream = stream.pipe(concat(concatName));
  }

  return stream
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(dest));
};

const compileMainJs = () => {
  return compileJs(
    ["node_modules/swiper/swiper-bundle.js", "./src/js/*.js"],
    "./dist/js",
    "main.min.js",
  );
};

const compileAnimationJs = () => {
  return compileJs(
    [
      "./src/js/animation/animation.js",
      "node_modules/particles.js/particles.js",
    ],
    "./dist/js/animation",
  );
};

// const images = () => {
//   return gulp.src("./src/assets/**/*").pipe(gulp.dest("./dist/assets/"));
// };
//
// const videos = () => {
//   return gulp.src("./src/assets/*.{mp4,mov}").pipe(gulp.dest("./dist/assets/"));
// };
//
// const fonts = () => {
//   return gulp.src("./src/fonts/**/*").pipe(gulp.dest("./dist/fonts/"));
// };


const images = () => {
  return gulp.src("./src/assets/**/*.{jpg,jpeg,png,svg,gif}")
    .pipe(gulp.dest("./dist/assets/"));
};

// const videos = () => {
//   return gulp.src("./src/assets/videos/*.{mp4,mov}")
//     .pipe(gulp.dest("./dist/assets/videos/"));
// };

const fonts = () => {
  return gulp.src("./src/fonts/**/*")
    .pipe(gulp.dest("./dist/fonts/"));
};

const watchers = () => {
  gulp.watch("./src/pages/**/*.html", gulp.parallel(htmlCompile));
  gulp.watch(
    "./src/scss/**/*.scss",
    { events: "change" },
    gulp.parallel(scssCompile),
  );
  gulp.watch(
    "./src/js/**/*.js",
    gulp.series(compileMainJs, compileAnimationJs),
  );
  gulp.watch(
    "./src/assets/**/*",
    { events: ["add", "unlink"] },
    gulp.parallel(images),
  );
  // gulp.watch(
  //   "./src/assets/**/*",
  //   { events: ["add", "unlink"] },
  //   gulp.parallel(videos),
  // );
  gulp.watch(
    "./src/fonts/**/*",
    { events: ["add", "unlink"] },
    gulp.parallel(fonts),
  );
};

// change CSS paths
// const updatePathsInCSS = () => {
//   return gulp.src("./dist/css/**/*.css")
//     .pipe(replace(/(\.\.\/\.\.\/assets\/)/g, './assets/'))
//     .pipe(gulp.dest("./dist/css"));
// };

// change HTML paths
const updatePathsInHTML = () => {
  return gulp.src("./dist/**/*.html")
    .pipe(replace(/(\.\.\/\.\.\/assets\/)/g, './assets/'))
    .pipe(gulp.dest("./dist"));
};


exports.default = gulp.series(
  cleanFiles,
  gulp.parallel(
    htmlCompile,
    scssCompile,
    compileMainJs,
    compileAnimationJs,
    images,
    // videos,
    fonts,
  ),
  gulp.parallel(startServer, watchers),
);

exports.build = gulp.series(
  cleanFiles,
  gulp.parallel(
    htmlCompile,
    scssCompile,
    compileMainJs,
    compileAnimationJs,
    images,
    // videos,
    fonts
  ),
  gulp.parallel(updatePathsInHTML, updatePathsInHTML)
);