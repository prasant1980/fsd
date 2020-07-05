// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

var reportsDirectory = './reports';
var detailsReportDirectory = reportsDirectory + '/detailReport';

var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var ScreenshotAndStackReporter = new HtmlScreenshotReporter({
    dest: detailsReportDirectory,
    filename: 'E2ETestingReport.html',
    reportTitle: "E2E Testing Report",
    showSummary: true,
    reportOnlyFailedSpecs: false,
    captureOnlyFailedSpecs: true,
});

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
      'args': ['--no-sandbox']
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  beforeLaunch() {
    return new Promise(function (resolve) {
        ScreenshotAndStackReporter.beforeLaunch(resolve);
    });
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};