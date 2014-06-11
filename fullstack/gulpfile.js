//----------------------------------------------------------------------------
//
// Plugins to consider in the future:
// http://blog.nodejitsu.com/npmawesome-9-gulp-plugins/
// https://www.npmjs.org/package/gulp-asset/
//  var jsdoc = require('gulp-jsdoc');
//  var imagemin = require('gulp-imagemin');
//  var changed = require('gulp-changed');

//----------------------------------------------------------------------------

var async = require('async');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var bower = require('gulp-bower');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var eventStream = require('event-stream');
var gulp = require('gulp');
var inject = require("gulp-inject");
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');




//--------------------------------------
// Init tasks
//
// These are tasks that only need to be once run after a clean
//--------------------------------------

/**
 * Run bower install
 */
gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('bower_components'));
});

/**
 * Copy the javascript files
 */
gulp.task('bower_js', ['bower'],  function () {
  return gulp.src([
    'bower_components/angular/angular.js',
    //'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    'bower_components/angular-cookies/angular-cookies.js',
    'bower_components/angular-messages/angular-messages.js',
    'bower_components/angular-resource/angular-resource.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-strap/dist/angular-strap.js',
    'bower_components/angular-strap/dist/angular-strap.tpl.js',
    //'bower_components/angular-ui/build/angular-ui.js',
    'bower_components/momentjs/moment.js'
  ])
    .pipe(gulp.dest('client/vendor'));
});

/**
 * Copy the fonts
 */
gulp.task('bower_fonts', ['bower'], function () {
  return gulp.src(['bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap/*'])
    .pipe(gulp.dest('client/fonts'));
});

/**
 * Copy the sass and then compile
 */
gulp.task('bower_sass', ['bower'], function () {
  return gulp.src('bower_components/bootstrap-sass-official/vendor/assets/stylesheets/bootstrap/**/*')
    .pipe(gulp.dest('client/css/bootstrap'))
});

/**
 * This is encapsulates all the dependencies for vendor
 */
gulp.task('init', ['bower', 'bower_js', 'bower_fonts', 'bower_sass']);


//--------------------------------------
// Application tasks
//--------------------------------------

gulp.task('sass', function(cb) {
  return gulp.src('client/css/*.scss')
    .pipe(plumber())
    .pipe(sass())
    //.pipe(sass({sourceComments: 'map', sourceMap: 'ignored'}))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('client/css'))
//    .pipe(csso())
//    .pipe(rename({suffix:'.min'}))
//    .pipe(gulp.dest('client/css'));
});

gulp.task('javascript', function () {
  return gulp.src(['client/**/*.js', '!client/vendor/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
//    .pipe(jsdoc('docs'))
});

gulp.task('index', function () {
  return gulp.src('client/index.tmpl.html')
    .pipe(inject(gulp.src(['client/vendor/*.js', '!client/vendor/angular.js'],
        { read: false }),
        { starttag: '<!-- inject:vendor:js -->',
          ignorePath: ['client'],
          addRootSlash: false
        }))
    .pipe(inject(gulp.src(['client/**/*.js', '!client/vendor/*.js', '!client/app.js'],
        {read: false}),
        { ignorePath: ['client'],
          addRootSlash: false
        }))
    .pipe(rename("index.html"))
    .pipe(gulp.dest("client"));
});

gulp.task('watch', function() {
  gulp.watch('client/css/.scss', ['sass']);
  gulp.watch('client/**/*.js', ['javascript', 'index']);
  gulp.watch('client/index.tmpl.html', ['index']);
  // gulp.watch(['client/**/.js', '!build/public/app.min.js', '!client/vendor'], ['compress']);
});

gulp.task('clean', function () {
  return gulp.src([
    'node_modules',
    'bower_components',
    'client/vendor',
    'client/fonts',
    'client/css/*.css',
    'client/index.html'
  ], {read: false})
    .pipe(clean());
});


gulp.task('default', ['bower', 'sass', 'javascript', 'index', 'watch']);



// This is for building a dist
//gulp.task('default', ['bower', 'vendor', 'sass', 'compress', 'templates', 'watch']);


//// Compress the javascript into one file
//gulp.task('compress', function() {
//  gulp.src([
//    'client/vendor/angular.js',
//    'client/vendor/*.js',
//    'client/app.js',
//    'client/services/*.js',
//    'client/controllers/*.js',
//    'client/filters/*.js',
//    'client/directives/*.js'
//  ])
//    .pipe(concat('app.js'))
//    .pipe(gulp.dest('build/public'))
//    .pipe(uglify({outSourceMap: true}))
//    .pipe(rename({suffix:'.min'}))
//    .pipe(gulp.dest('build/public'));
//});
//
//gulp.task('templates', function() {
//  gulp.src('client/views/**/*.html')
//    .pipe(templateCache({ root: 'views', module: 'MyApp' }))
//    .pipe(gulp.dest('build/public'));
//});
//
