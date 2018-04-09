'use strict'

const screenshotNames = ['charts-dashboard-landing.png'];
const screenshotDir = './screenshots-temp';
const origImageDir = './source/images/charts';

exports.run = async function (options) {
  const nightmare = options.nightmare;
  const originalPath = `${origImageDir}/${screenshotNames[0]}`;
  const screenshotPath = `${screenshotDir}/${screenshotNames[0]}`;

  await nightmare.goto('http://charts.mongodb.parts');
  await nightmare.wait('.Charts_dashboard-overview_list---QP2c0');
  await nightmare.wait(1000);

  // take a screenshot
  await nightmare.screenshot(screenshotPath);
  await nightmare.wait(500);
  await nightmare.end();

  return [[originalPath, screenshotPath]];
}

exports.nightmare_props = {
    show: true,
    typeInterval: 20,
    height: 1000,
    width: 1100,
    webPreferences: {
      zoomFactor: 1.0
    }
}
