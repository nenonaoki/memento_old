/**
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var pagespeed = require('psi');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 8',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src('app/assets/javascripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

// Optimize Images
gulp.task('images', function () {
  return gulp.src('app/assets/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('app/assets/images'))
    .pipe($.size({ title: 'images' }));
});

// Compile and Automatically Prefix Stylesheets
gulp.task('styles', function () {
  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
      'app/assets/styles/**/*.scss',
      '!app/assets/styles/**/_*.scss'
    ])
    .pipe($.changed('app/assets/stylesheets', { extension: '.scss' }))
    .pipe($.rubySass({
        'sourcemap=none': true,
        style: 'expanded',
        precision: 10
      })
      .on('error', console.error.bind(console))
    )
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('app/assets/stylesheets'))
    .pipe($.size({ title: 'styles' }));
});

// Scan Your HTML For Assets & Optimize Them
// gulp.task('html', function () {
//   var assets = $.useref.assets({searchPath: '{.tmp,app}'});

//   return gulp.src('app/**/*.html')
//     .pipe(assets)
//     // Concatenate And Minify JavaScript
//     .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
//     // Remove Any Unused CSS
//     // Note: If not using the Style Guide, you can delete it from
//     // the next line to only include styles your project uses.
//     .pipe($.if('*.css', $.uncss({
//       html: [
//         'app/index.html',
//         'app/styleguide.html'
//       ],
//       // CSS Selectors for UnCSS to ignore
//       ignore: [
//         /.navdrawer-container.open/,
//         /.app-bar.open/
//       ]
//     })))
//     // Concatenate And Minify Styles
//     // In case you are still using useref build blocks
//     .pipe($.if('*.css', $.csso()))
//     .pipe(assets.restore())
//     .pipe($.useref())
//     // Update Production Style Guide Paths
//     .pipe($.replace('components/components.css', 'components/main.min.css'))
//     // Output Files
//     .pipe(gulp.dest('dist'))
//     .pipe($.size({title: 'html'}));
// });

// Watch Files For Changes
gulp.task('serve', ['styles'], function () {
  gulp.watch(['app/assets/styles/**/*.{scss,css}'], ['styles']);
  // gulp.watch(['app/scripts/**/*.js'], ['jshint']);
});

// Build Production Files, the Default Task
gulp.task('default', function (cb) {
  runSequence('styles', ['jshint', 'images'], cb);
});

// Run PageSpeed Insights
// Update `url` below to the public URL for your site
gulp.task('pagespeed', pagespeed.bind(null, {
  // By default, we use the PageSpeed Insights
  // free (no API key) tier. You can use a Google
  // Developer API key if you have one. See
  // http://goo.gl/RkN0vE for info key: 'YOUR_API_KEY'
  url: 'https://example.com',
  strategy: 'mobile'
}));

// Load custom tasks from the `tasks` directory
try { require('require-dir')('tasks'); } catch (err) {}
