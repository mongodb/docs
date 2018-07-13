'use strict';

const screenshotNames = ['order-tutorial-edit-add-filter.png'];
const screenshotDir = './screenshots-temp';
const origImageDir = './source/images/charts';

exports.run = async function (options) {
  const nightmare = options.nightmare;
  const originalPath = `${origImageDir}/${screenshotNames[0]}`;
  const screenshotPath = `${screenshotDir}/${screenshotNames[0]}`;

  await options.loginToCharts();
  await nightmare.wait(1000);
  await nightmare.goto('http://charts.mongodb.parts/dashboards/620d7000-0463-4298-80c7-4d8174df316f/charts/334f8f4b-c74c-467e-ad8e-ae64962750d7')
  await nightmare.wait('.CodeMirror > div:nth-child(1) > textarea:nth-child(1)')
  await nightmare.type('.CodeMirror > div:nth-child(1) > textarea:nth-child(1)', "{ storeLocation: { $in: [ 'Denver', 'New York' ] }, 'items.price': {$gte: 1200} }")
  await nightmare.wait(2000)
  await nightmare.click('button.btn-primary:nth-child(1)')
  await nightmare.wait(2500)
  await nightmare.screenshot(screenshotPath)
  await nightmare.wait(1000)
  await nightmare.end();

  return [[originalPath, screenshotPath]];
}

exports.nightmare_props = {
    show: true,
    typeInterval: 20,
    height: 1200,
    width: 1200,
    webPreferences: {
      zoomFactor: 1.1
    }
}
