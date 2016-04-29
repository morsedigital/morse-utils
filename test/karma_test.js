// var config = require("../karma.conf")
var babelify    = require("babelify");

var opts = {
  // base path that will be used to resolve all patterns (eg. files, exclude)
  basePath: '',


  // frameworks to use
  // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
  frameworks: ['browserify', 'jasmine'],


  // list of files / patterns to load in the browser
  files: [
    './node_modules/babel-polyfill/browser.js',
    {pattern:'./src/*.js', included: false},
    './spec/**/*_spec.js'
  ],


  // list of files to exclude
  exclude: [
  ],


  // preprocess matching files before serving them to the browser
  // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
  preprocessors: {
    './src/*.js': ['browserify', 'sourcemap'],
    './spec/**/*_spec.js': ['browserify', 'sourcemap']
  },

  browserify: {
    debug: false,
    transform: [['rewireify', { ignore: 'moof' }]],
    extensions: [ "es6.js", ".js"],
    bundleDelay: 1000,
    configure: function(bundle) {
      // console.log("coverage", istanbul)
      bundle.transform(babelify, {presets: ["es2015"]})
    }
  },

  babelPreprocessor: {
    options: {
      presets: ['es2015']
    }
  },



  // test results reporter to use
  // possible values: 'dots', 'progress'
  // available reporters: https://npmjs.org/browse/keyword/karma-reporter
  reporters: ['story', 'progress'],

  // enable / disable watching file and executing tests whenever any file changes
  autoWatch: true,


  // start these browsers
  // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
  browsers: ['PhantomJS'],


  // Continuous Integration mode
  // if true, Karma captures browsers, runs the tests and exits
  singleRun: true,

  // Concurrency level
  // how many browser should be started simultanous
  // concurrency: Infinity
  plugins: [
    require("karma-jasmine"),
    require("karma-firefox-launcher"),
    require("karma-chrome-launcher"),
    require("karma-safari-launcher"),
    require("karma-phantomjs-launcher"),
    require("karma-browserify"),
    require("karma-story-reporter"),
    require("karma-babel-preprocessor"),
    require("karma-sourcemap-loader"),
    require("babel-preset-es2015")
  ]
}

var Server = require('karma').Server
var server = new Server(opts)

server.start()