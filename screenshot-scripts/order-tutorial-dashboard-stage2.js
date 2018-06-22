'use strict';

const screenshotNames = ['order-tutorial-dashboard-stage2.png'];
const screenshotDir = './screenshots-temp';
const origImageDir = './source/images/charts';

exports.run = async function (options) {
  const nightmare = options.nightmare;
  const originalPath = `${origImageDir}/${screenshotNames[0]}`;
  const screenshotPath = `${screenshotDir}/${screenshotNames[0]}`;

  await nightmare.goto('http://charts.mongodb.parts/dashboards/dd516286-1ada-4781-b7dc-ec807fa36c4a')
  await nightmare.wait('.react-resizable-handle')
  await nightmare.wait(1000)
  await nightmare.screenshot(screenshotPath)
  await nightmare.wait(1000)
  await nightmare.end();

  return [[originalPath, screenshotPath]];
}

exports.nightmare_props = {
    show: true,
    typeInterval: 20,
    height: 1000,
    width: 1200,
    webPreferences: {
      zoomFactor: 1.1
    }
}
