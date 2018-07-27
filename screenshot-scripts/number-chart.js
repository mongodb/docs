'use strict';

const screenshotNames = ['number-chart-example.png'];
const screenshotDir = './screenshots-temp';
const origImageDir = './source/images/charts';

exports.run = async function (options) {
  const nightmare = options.nightmare;
  const originalPath = `${origImageDir}/${screenshotNames[0]}`;
  const screenshotPath = `${screenshotDir}/${screenshotNames[0]}`;

  await options.loginToCharts();
  await nightmare.wait(1000);
  await nightmare.goto('https://charts.mongodb.parts/dashboards/620d7000-0463-4298-80c7-4d8174df316f/charts/59b830a6-8b52-48ed-8bad-9dd073983901')
  await nightmare.wait('.marks')
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
    width: 1200,
    webPreferences: {
      zoomFactor: 1.1
    }
}
