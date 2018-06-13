'use strict';

const screenshotNames = ['user-management-view.png'];
const screenshotDir = './screenshots-temp';
const origImageDir = './source/images/charts';

exports.run = async function (options) {
  const nightmare = options.nightmare;
  const originalPath = `${origImageDir}/${screenshotNames[0]}`;
  const screenshotPath = `${screenshotDir}/${screenshotNames[0]}`;

  await nightmare.goto('http://localhost:80')
  await nightmare.wait('input#email')
  await nightmare.type('input#email', 'igordon@example.com')
  await nightmare.type('input#password', 'password')
  await nightmare.click('[data-test-id="login-form-submit-button"]')
  await nightmare.wait('a[href="/users"]')
  await nightmare.click('a[href="/users"]')
  await nightmare.wait('table')
  await nightmare.screenshot(screenshotPath)
  await nightmare.wait(500)
  await nightmare.end();

  return [[originalPath, screenshotPath]];
}

exports.nightmare_props = {
    show: true,
    typeInterval: 20,
    height: 1000,
    width: 1500,
    webPreferences: {
      zoomFactor: 1.25
    }
}
