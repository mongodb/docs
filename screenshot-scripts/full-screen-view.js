'use strict';

const screenshotNames = ['full-screen-view.png'];
const screenshotDir = './screenshots-temp';
const origImageDir = './source/images/charts';

exports.run = async function (options) {
  const nightmare = options.nightmare;
  const originalPath = `${origImageDir}/${screenshotNames[0]}`;
  const screenshotPath = `${screenshotDir}/${screenshotNames[0]}`;
  await options.loginToCharts();
  await nightmare.wait(2000);
  await nightmare.goto('https://charts.mongodb.parts/dashboards/a8015200-65c5-4f9a-8084-ce7bfd73c5ef')
  await nightmare.wait('div.react-grid-item:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > canvas:nth-child(1)')
  await nightmare.wait(1000)
  await nightmare.screenshot(screenshotPath)
  await nightmare.wait(1000)
  await nightmare.end();

  return [[originalPath, screenshotPath]];
}

exports.nightmare_props = {
    show: true,
    typeInterval: 20,
    height: 700,
    width: 1550,
    webPreferences: {
      zoomFactor: 1.0
    }
}
