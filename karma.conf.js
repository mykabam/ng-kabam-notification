// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // module dependencies
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'test/lib/socket.io.js',
      'bower_components/angular-socket-io/socket.js',
      // the module files
      'src/ng-kabam-notification.js',
      'src/controllers/**/*.js',
      'src/services/**/*.js',
      // the module tests
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 9876,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)

    // test this browers on local development environment
    browsers: ['Firefox', 'Chrome'],

    // test this browers on TravisCI
    // browsers: ['PhantomJS', 'Firefox'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    captureTimeout: 100000
  });
};