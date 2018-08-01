'use strict';

const screenshotNames = ['charts-dashboard-new.png'];
const screenshotDir = './screenshots-temp';
const origImageDir = './source/images/charts';

exports.run = async function (options) {
  const nightmare = options.nightmare;
  const originalPath = `${origImageDir}/${screenshotNames[0]}`;
  const screenshotPath = `${screenshotDir}/${screenshotNames[0]}`;

  await options.loginToCharts();
  await nightmare.goto('https://charts.mongodb.parts/dashboards/dbd0f67c-0fa4-4c9a-8d22-cb88d7bca9de')
  await nightmare.wait('button.Charts_button_group-item---3cX9M')
  await nightmare.screenshot(screenshotPath)
  await nightmare.wait(500)
  await nightmare.end();

  return [[originalPath, screenshotPath]];
}

exports.nightmare_props = {
    show: true,
    typeInterval: 20,
    height: 800,
    width: 1500,
    webPreferences: {
      zoomFactor: 1.0
    }
}
