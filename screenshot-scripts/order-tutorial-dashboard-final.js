'use strict';

const screenshotNames = ['dashboard-access-button.png'];
const screenshotDir = './screenshots-temp';
const origImageDir = './source/images/charts';

exports.run = async function (options) {
  const nightmare = options.nightmare;
  const originalPath = `${origImageDir}/${screenshotNames[0]}`;
  const screenshotPath = `${screenshotDir}/${screenshotNames[0]}`;

  await nightmare.goto('http://charts.mongodb.parts/dashboards/b1b1d6f3-dbe8-4a92-8c63-31ea3056e67b')
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
    height: 650,
    width: 750,
    webPreferences: {
      zoomFactor: 0.68
    }
}
