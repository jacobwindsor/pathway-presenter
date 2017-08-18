require('dotenv').config()
var browserstack = require('browserstack-local');

exports.config = {
  user:  process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_KEY,

  updateJob: false,
  specs: [
    './src/**/e2e.test.js'
  ],
  exclude: [],

  commonCapabilities: {
    name: 'local_parallel_test',
    build: 'webdriver-browserstack',
    'browserstack.local': true
  },

  capabilities: [
    {
      browser: 'chrome',
      'browser_version': '60.0',
    },
    {
      browser: 'chrome',
      'browser_version': '55.0',
    },
    {
      browser: 'firefox',
      'browser_version': '55.0',
    },
    {
      browser: 'firefox',
      'browser_version': '46.0',
    },
    {
      browser: 'internet explorer',
      'browser_version': '11.0',
    },
    {
      'browser': 'Safari',
      'browser_version': '10.0',
    },
    {
      'browser': 'Edge',
      'browser_version': '15.0',
    },
    {
      'browser': 'Edge',
      'browser_version': '14.0',
    }
  ],

  logLevel: 'verbose',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd'
  },

  // Code to start browserstack local before start of test
  onPrepare: function (config, capabilities) {
    console.log("Connecting local");
    return new Promise(function(resolve, reject){
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({'key': exports.config.key }, function(error) {
        if (error) return reject(error);
        console.log('Connected. Now testing...');

        resolve();
      });
    });
  },

  // Code to stop browserstack local after end of test
  onComplete: function (capabilties, specs) {
    exports.bs_local.stop(function() {});
  },

  // Add Chai
  before: function() {
    var chai = require('chai');
    global.expect = chai.expect;
    chai.Should();
  }
};

// Code to support common capabilities
exports.config.capabilities.forEach(function(caps){
  for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
})