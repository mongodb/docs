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

gulp.task('sass', ['sass:lint', 'sass:build'])

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

gulp.task('js:build-navbar', function() {
  gulp.src('./src/navbar-docs.js')
    .pipe(webpack({
      output: {
        filename: 'navbar-docs.js'
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

gulp.task('js:build-navbar-landing', function() {
  gulp.src('./src/navbar-landing.js')
    .pipe(webpack({
      output: {
        filename: 'navbar-landing.js'
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

gulp.task('js:build-navbar-tools', function() {
  gulp.src('./src/navbar-tools.js')
    .pipe(webpack({
      output: {
        filename: 'navbar-tools.js'
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

gulp.task('js:build-navbar-cloud', function() {
  gulp.src('./src/navbar-cloud.js')
    .pipe(webpack({
      output: {
        filename: 'navbar-cloud.js'
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

gulp.task('js:build-landing-sidebar', function() {
  gulp.src('./src/landing.js')
    .pipe(webpack({
      output: {
        filename: 'landing-sidebar.js'
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

gulp.task('js:build-landing-list', function() {
  gulp.src('./src/landing-list.js')
    .pipe(webpack({
      output: {
        filename: 'landing-list.js'
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

gulp.task('js', ['js:build-home', 'js:build-single'])

gulp.task('landing', [
  'js:build-navbar',
  'js:build-navbar-landing',
  'js:build-navbar-tools',
  'js:build-navbar-cloud',
  'js:build-landing-sidebar',
  'js:build-landing-list',
  'sass:build-navbar',
])

gulp.task('watch', function() {
  gulp.watch('./src/styles/**/*.scss', ['sass'])
  gulp.watch('./src/**/*.js', ['js'])
})

gulp.task('default', ['sass', 'js', 'watch'])
