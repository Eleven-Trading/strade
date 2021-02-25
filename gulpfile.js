'use strict'

var gulp = require('gulp')
var php = require('gulp-connect-php')
var browserSync = require('browser-sync').create()
var changed = require('gulp-changed')
var log = require('fancy-log')
var clean = require('gulp-clean')
var replace = require('gulp-replace')

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
    mediasPath: {
        src: "src/medias/**/*",
        dest: "dist/medias/"
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

function mediasFunction() {
    return gulp.src(paths.mediasPath.src, { allowEmpty: true })
        .pipe(changed(paths.mediasPath.dest))
        .pipe(gulp.dest(paths.mediasPath.dest))
        .pipe(browserSync.stream());
};

function scriptsFunction() {
    var FMP_API, i = process.argv.indexOf("--FMP_API");
    if (i > -1) {
        FMP_API = process.argv[i + 1];
        //console.log("OKTA_BASE_URL is "+OKTA_BASE_URL)
    } else{FMP_API = ''}

    var OKTA_BASE_URL, i = process.argv.indexOf("--OKTA_BASE_URL");
    if (i > -1) {
        OKTA_BASE_URL = process.argv[i + 1];
        console.log("OKTA_BASE_URL is "+OKTA_BASE_URL)
    } else{OKTA_BASE_URL = ''}
    
    var OKTA_CLIENT_ID, i = process.argv.indexOf("--OKTA_CLIENT_ID");
    if (i > -1) {
        OKTA_CLIENT_ID = process.argv[i + 1];
        console.log("OKTA_CLIENT_ID is "+OKTA_CLIENT_ID)
    } else{OKTA_CLIENT_ID = ''}

    return gulp.src(paths.scriptsPath.src, { allowEmpty: true })
        .pipe(replace('FMP_API', FMP_API))
        .pipe(replace('OKTA_BASE_URL', OKTA_BASE_URL))
        .pipe(replace('OKTA_CLIENT_ID', OKTA_CLIENT_ID))
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
    gulp.watch(paths.mediasPath.src, mediasFunction);
    gulp.watch(paths.scriptsPath.src, scriptsFunction);
    gulp.watch(paths.viewsPath.src, viewsFunction);
    gulp.watch(paths.captainPath.src, captainFunction);
}

/******** GULP *********/
var prod = gulp.parallel(cssFunction, iconsFunction, mediasFunction, scriptsFunction, viewsFunction, captainFunction);
var build = gulp.parallel(prod, browserInit, phpLaunchFunction, watch); //run prod is necessary in case clean has beed done before

gulp.task('default', build);
gulp.task('clean', cleanDist);
gulp.task('prod', prod); //prod ready folder