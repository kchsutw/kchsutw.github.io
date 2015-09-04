/*global -$ */
'use strict';
// generated on 2015-07-26 using generator-gulp-webapp 0.3.0
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var proxy = require('http-proxy-middleware');
var reload = browserSync.reload;

gulp.task('clearCache', function() {
  // Still pass the files to clear cache for
  gulp.src('app/images/**/*')
    .pipe($.cache.clear());

  // Or, just call this for everything
  $.cache.clearAll();
});


gulp.task('styles', function () {
  return gulp.src('app/styles/main.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: ['.'],
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 1 version']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('html', ['styles'], function () {
  var assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    // .pipe($.cache($.imagemin({
    //   progressive: true,
    //   interlaced: true,
    //   // don't remove IDs from SVGs, they are often used
    //   // as hooks for embedding and styling
    //   svgoPlugins: [{cleanupIDs: false}]
    // })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('json', ['highlight','celebrities'],function () {
  return gulp.src('app/*.json')
    .pipe(gulp.dest('dist'));
});
gulp.task('highlight', function (cb) {
  var fs = require('fs');
  var highlight = require('./highlight.js');
  return fs.writeFile("app/highlight.json", JSON.stringify(highlight), cb) ;
});
gulp.task('celebrities', function (cb) {
  var fs = require('fs');
  var celebrities = require('./celebrities.js');
  return fs.writeFile("app/celebrities.json", JSON.stringify(celebrities), cb) 
});
gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('nodemon', function (cb) {
  
  var started = false;
  
  return $.nodemon({
    script: '../kc-api/server/index.js'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true; 
    } 
  });
});

gulp.task('serve', ['styles', 'fonts', 'nodemon'], function () {

  var proxyOptions = {};
  proxyOptions.target = 'http://localhost:3000';
  proxyOptions.changeOrigin= true;

  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components',
        '/dist': 'dist'
      },
      middleware: [proxy('/api',  proxyOptions),proxy('/explorer',  proxyOptions)]
    }
  });

  // watch for changes
  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*',
    '.tmp/fonts/**/*',
    'app/*.json'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
  gulp.watch('celebrities.js', ['celebrities']);
  gulp.watch('highlight.js', ['highlight']);
  // gulp.watch('app/**/*', ['build']);
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap-sass-official'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['jshint', 'html', 'images', 'fonts', 'extras','json'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
