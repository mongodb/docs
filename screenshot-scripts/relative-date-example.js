'use strict';

const screenshotNames = ['relative-date-example.png'];
const screenshotDir = './screenshots-temp';
const origImageDir = './source/images/charts';

exports.run = async function (options) {
  const nightmare = options.nightmare;
  const originalPath = `${origImageDir}/${screenshotNames[0]}`;
  const screenshotPath = `${screenshotDir}/${screenshotNames[0]}`;

  await options.loginToCharts();
  await nightmare.wait(1000);
  await nightmare.goto('https://charts.mongodb.parts/dashboards/c4060c9b-8b68-4f2a-af6b-18af15ccef01/charts/1fe0ca81-1b4a-4383-b516-3e1e5b65e6b7')
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
    width: 1400,
    webPreferences: {
      zoomFactor: 1.1
    }
}
