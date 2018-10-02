'use strict';

const screenshotNames = ['data-table-dynamic-example.png'];
const screenshotDir = './screenshots-temp';
const origImageDir = './source/images/charts';

exports.run = async function (options) {
  const nightmare = options.nightmare;
  const originalPath = `${origImageDir}/${screenshotNames[0]}`;
  const screenshotPath = `${screenshotDir}/${screenshotNames[0]}`;

  await options.loginToCharts();
  await nightmare.wait(1000);
  await nightmare.goto('https://charts.mongodb.parts/dashboards/ee8f8a17-4d96-4cd8-8178-0d9bc1181513/charts/b9f60d83-be4c-4df5-b5ef-506d1d35a952')
  await nightmare.wait('.ag-cell')
  await nightmare.wait(1500)
  await nightmare.screenshot(screenshotPath)
  await nightmare.wait(1000)
  await nightmare.end();

  return [[originalPath, screenshotPath]];
}

exports.nightmare_props = {
    show: true,
    typeInterval: 20,
    height: 1200,
    width: 1000,
    webPreferences: {
      zoomFactor: 0.8
    }
}
