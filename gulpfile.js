'use strict'

var gulp = require('gulp')
var php = require('gulp-connect-php')
var browserSync = require('browser-sync').create()
var changed = require('gulp-changed')
var log = require('fancy-log')
var clean = require('gulp-clean')

/******** PATHS **********/
var paths = {
    cssPath: {
        src: "src/css/**/*",
        dest: "dist/css/"
    },
    iconsPath: {
        src: "src/icons/**/*",
        dest: "dist/icons/"
    },
    imagesPath: {
        src: "src/images/**/*",
        dest: "dist/images/"
    },
    scriptsPath: {
        src: "src/scripts/**/*",
        dest: "dist/scripts/"
    },
    viewsPath: {
        src: "src/*.html",
        dest: "dist/"
    },
    captainPath: {
        src: "src/captain-definition",
        dest: "dist/"
    }
};

/******** FUNCTIONS **********/
function cssFunction() {
    return gulp.src(paths.cssPath.src, { allowEmpty: true })
        .pipe(changed(paths.cssPath.dest))
        .pipe(gulp.dest(paths.cssPath.dest))
        .pipe(browserSync.stream());
};

function iconsFunction() {
    return gulp.src(paths.iconsPath.src, { allowEmpty: true })
        .pipe(changed(paths.iconsPath.dest))
        .pipe(gulp.dest(paths.iconsPath.dest))
        .pipe(browserSync.stream());
};

function imagesFunction() {
    return gulp.src(paths.imagesPath.src, { allowEmpty: true })
        .pipe(changed(paths.imagesPath.dest))
        .pipe(gulp.dest(paths.imagesPath.dest))
        .pipe(browserSync.stream());
};

function scriptsFunction() {
    return gulp.src(paths.scriptsPath.src, { allowEmpty: true })
        //.pipe(errorHandler())
        //.pipe(changed(paths.scriptsPath.dest))
        .pipe(gulp.dest(paths.scriptsPath.dest))
        .pipe(browserSync.stream());
};

function viewsFunction() {
    return gulp.src(paths.viewsPath.src, { allowEmpty: true })
        //.pipe(changed(paths.viewsPath.dest))
        .pipe(gulp.dest(paths.viewsPath.dest))
        .pipe(browserSync.stream());
};

function captainFunction() {
    return gulp.src(paths.captainPath.src, { allowEmpty: true })
        .pipe(changed(paths.captainPath.dest))
        .pipe(gulp.dest(paths.captainPath.dest))
        .pipe(browserSync.stream());
};

function cleanDist() {
    return gulp.src('dist', { read: false }, { allowEmpty: true })
        .pipe(clean());
};


/******** WATCH **********/

//launch function server
function phpLaunchFunction() {
    console.log("Launching php function server");
    php.server({ base: '../../functions', port: 8888, keepalive: true });
}

// Gulp task to open the default web browser, serving static files
function browserInit() {
    browserSync.init({
        port: 3000,
        server: {
            baseDir: "dist"
        },
        open: true,
        notify: false,
        injectChanges: false
    });
};

function watch() {
    log("watching !!");
    gulp.watch(paths.cssPath.src, cssFunction);
    gulp.watch(paths.iconsPath.src, iconsFunction);
    gulp.watch(paths.imagesPath.src, imagesFunction);
    gulp.watch(paths.scriptsPath.src, scriptsFunction);
    gulp.watch(paths.viewsPath.src, viewsFunction);
    gulp.watch(paths.captainPath.src, captainFunction);
}

/******** GULP *********/
var prod = gulp.parallel(cssFunction, iconsFunction, imagesFunction, scriptsFunction, viewsFunction, captainFunction);
var build = gulp.parallel(prod, browserInit, phpLaunchFunction, watch); //run prod is necessary in case clean has beed done before

gulp.task('default', build);
gulp.task('clean', cleanDist);
gulp.task('prod', prod); //prod ready folder