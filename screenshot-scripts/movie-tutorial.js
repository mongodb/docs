'use strict';

const screenshotNames = ['movie-tutorial-dashboard-final.png'];
const screenshotDir = './screenshots-temp';
const origImageDir = './source/images/charts';

exports.run = async function (options) {
  const nightmare = options.nightmare;
  const originalPath = `${origImageDir}/${screenshotNames[0]}`;
  const screenshotPath = `${screenshotDir}/${screenshotNames[0]}`;

  await nightmare.goto('http://charts.mongodb.parts')
  await nightmare.wait('input#email')
  await nightmare.type('input#email', '<USERNAME>')
  await nightmare.type('input#password', '<PASSWORD>')
  await nightmare.click('[data-test-id="login-form-submit-button"]')
  await nightmare.wait('a[href="/dashboards"]')
  await nightmare.click('a[href="/dashboards"]')
  await nightmare.wait('a[href="/dashboards/b3757c09-9de3-43e9-acc8-7d3afe4699bf"]')
  await nightmare.click('a[href="/dashboards/b3757c09-9de3-43e9-acc8-7d3afe4699bf"]')
  await nightmare.wait(2000)
  await nightmare.screenshot(screenshotPath)
  await nightmare.wait(500)
  await nightmare.end();

  return [[originalPath, screenshotPath]];
}

exports.nightmare_props = {
    show: true,
    typeInterval: 20,
    height: 2000,
    width: 1500,
    webPreferences: {
      zoomFactor: 1.2
    }
}
