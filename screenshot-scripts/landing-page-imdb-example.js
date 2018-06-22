'use strict';

const screenshotNames = ['landing-page-imdb-example.png'];
const screenshotDir = './screenshots-temp';
const origImageDir = './source/images/charts';

exports.run = async function (options) {
  const nightmare = options.nightmare;
  const originalPath = `${origImageDir}/${screenshotNames[0]}`;
  const screenshotPath = `${screenshotDir}/${screenshotNames[0]}`;

  await nightmare.goto('http://charts.mongodb.parts/dashboards/d28dad11-065e-42d3-86df-93e008fbd083')
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
    height: 1400,
    width: 1100,
    webPreferences: {
      zoomFactor: 1.0
    }
}
