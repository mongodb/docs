const autoprefixer = require('gulp-autoprefixer')
const babili = require("gulp-babili")
const gulp = require('gulp')
const gulpWebpack = require('gulp-webpack')
const plumber = require('gulp-plumber')
const pump = require('pump')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const scsslint = require('gulp-scss-lint')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const webpack = require('webpack')

gulp.task('sass:lint', function() {
  gulp.src('./src/styles/*.scss')
    .pipe(plumber())
    .pipe(scsslint())
})

gulp.task('sass:build', function() {
  gulp.src('./src/styles/app.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./static/css/'))
})

gulp.task('sass:prod:build', function() {
  gulp.src('./src/styles/app.scss')
    .pipe(rename({suffix: '.min'}))
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed',
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./static/css/'))
})

gulp.task('sass:build-navbar', function() {
  gulp.src('./src/styles/navbar.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./static/css/'))
})

gulp.task('sass:prod:build-navbar', function() {
  gulp.src('./src/styles/navbar.scss')
    .pipe(rename({suffix: '.min'}))
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed',
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./static/css/'))
})

gulp.task('sass:build-feedback', function() {
  gulp.src('./src/styles/feedback.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['./node_modules/font-awesome-scss/scss']
    }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./static/css/'))
})

gulp.task('sass:prod:build-feedback', function() {
  gulp.src('./src/styles/feedback.scss')
    .pipe(rename({suffix: '.min'}))
    .pipe(plumber())
    .pipe(sass({
      outputstyle: 'compressed',
      includePaths: ['./node_modules/font-awesome-scss/scss']
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./static/css/'))
})

gulp.task('sass', [
  'sass:lint',
  'sass:build',
  'sass:build-navbar',
  'sass:build-feedback'
])

gulp.task('sass:prod', [
  'sass:prod:build',
  'sass:prod:build-navbar',
  'sass:prod:build-feedback'
])

gulp.task('js:build-navbar', function() {
  gulp.src('./src/navbar.js')
    .pipe(gulpWebpack({
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

gulp.task('js:build-search', function() {
  gulp.src(['whatwg-fetch', './src/worker-search.js'])
    .pipe(gulpWebpack({
      output: {
        filename: 'worker-search.js'
      },
      devtool: 'source-maps'
    }))
    .pipe(gulp.dest('./static/js/'))
})

gulp.task('js:prod:build-search', function(cb) {
  pump([
    gulp.src(['whatwg-fetch', './src/worker-search.js']),
    gulpWebpack({
      output: {
        filename: 'worker-search.min.js'
      }
    }),
    babili(),
    gulp.dest('./static/js/')
  ], cb)
})

gulp.task('js:prod:build-navbar', function(cb) {
  pump([
    gulp.src('./src/navbar.js'),
    gulpWebpack({
      output: {
        filename: 'navbar.min.js'
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        })
      ],
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
    }, webpack),
    uglify(),
    gulp.dest('./static/js/')
  ], cb)
})

gulp.task('js:build-home', function() {
  gulp.src(['whatwg-fetch', './src/home.js'])
    .pipe(gulpWebpack({
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

gulp.task('js:prod:build-home', function(cb) {
  pump([
    gulp.src(['whatwg-fetch', './src/home.js']),
    gulpWebpack({
      output: {
        filename: 'home.min.js'
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        })
      ],
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
    }, webpack),
    uglify(),
    gulp.dest('./static/js/')
  ], cb)
})

gulp.task('js:build-single', function() {
  gulp.src('./src/single.js')
    .pipe(gulpWebpack({
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

gulp.task('js:prod:build-single', function(cb) {
  pump([
    gulp.src('./src/single.js'),
    gulpWebpack({
      output: {
        filename: 'single.min.js'
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        })
      ],
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
    }, webpack),
    uglify(),
    gulp.dest('./static/js/')
  ], cb)
})

gulp.task('js:build-landing', function() {
  gulp.src('./src/landing.js')
    .pipe(gulpWebpack({
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

gulp.task('js:prod:build-landing', function(cb) {
  pump([
    gulp.src('./src/landing.js'),
    gulpWebpack({
      output: {
        filename: 'landing.min.js'
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        })
      ],
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
    }, webpack),
    uglify(),
    gulp.dest('./static/js/')
  ], cb)
})

gulp.task('js', [
  'js:build-home',
  'js:build-single',
  'js:build-navbar',
  'js:build-search',
  'js:build-landing'
])

gulp.task('js:prod', [
  'js:prod:build-home',
  'js:prod:build-single',
  'js:prod:build-navbar',
  'js:prod:build-search',
  'js:prod:build-landing'
])

gulp.task('build-prod', [
  'sass:prod',
  'js:prod'
])

gulp.task('watch', function() {
  gulp.watch('./src/styles/**/*.scss', ['sass'])
  gulp.watch('./src/**/*.js', ['js'])
})

gulp.task('default', ['sass', 'js', 'watch'])
