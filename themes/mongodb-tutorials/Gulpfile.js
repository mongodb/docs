var autoprefixer = require('gulp-autoprefixer')
var gulp = require('gulp')
var plumber = require('gulp-plumber')
var rename = require('gulp-rename')
var sass = require('gulp-sass')
var scsslint = require('gulp-scss-lint')
var sourcemaps = require('gulp-sourcemaps')
var webpack = require('gulp-webpack')

gulp.task('sass:lint', function() {
  gulp.src('./src/styles/*.scss')
    .pipe(plumber())
    .pipe(scsslint())
})

gulp.task('sass:build', function() {
  gulp.src('./src/styles/app.scss')
    .pipe(rename({suffix: '.min'}))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
    }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./static/css/'))
})

gulp.task('sass:build-navbar', function() {
  gulp.src('./src/styles/navbar.scss')
    .pipe(rename({suffix: '.min'}))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
    }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./static/css/'))
})

gulp.task('sass:build-feedback', function() {
  gulp.src('./src/styles/feedback.scss')
    .pipe(rename({suffix: '.min'}))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['./node_modules/font-awesome-scss/scss']
    }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./static/css/'))
})

gulp.task('sass', [
  'sass:lint',
  'sass:build',
  'sass:build-navbar',
  'sass:build-feedback'
])

gulp.task('js:build-navbar', function() {
  gulp.src('./src/navbar.js')
    .pipe(webpack({
      output: {
        filename: 'navbar.js'
      },
      devtool: 'source-maps',
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react'],
              plugins: ['transform-class-properties']
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest('./static/js/'))
})

gulp.task('js:build-home', function() {
  gulp.src('./src/home.js')
    .pipe(webpack({
      output: {
        filename: 'home.js'
      },
      devtool: 'source-maps',
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react'],
              plugins: ['transform-class-properties']
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest('./static/js/'))
})

gulp.task('js:build-single', function() {
  gulp.src('./src/single.js')
    .pipe(webpack({
      output: {
        filename: 'single.js'
      },
      devtool: 'source-maps',
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react'],
              plugins: ['transform-class-properties']
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest('./static/js/'))
})

gulp.task('js:build-landing', function() {
  gulp.src('./src/landing.js')
    .pipe(webpack({
      output: {
        filename: 'landing.js'
      },
      devtool: 'source-maps',
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react'],
              plugins: ['transform-class-properties']
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest('./static/js/'))
})

gulp.task('js', [
  'js:build-home',
  'js:build-single',
  'js:build-navbar',
  'js:build-landing'
])

gulp.task('watch', function() {
  gulp.watch('./src/styles/**/*.scss', ['sass'])
  gulp.watch('./src/**/*.js', ['js'])
})

gulp.task('default', ['sass', 'js', 'watch'])
