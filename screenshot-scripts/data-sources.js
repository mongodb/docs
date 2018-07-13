'use strict';

const screenshotNames = ['data-sources-view-new.png'];
const screenshotDir = './screenshots-temp';
const origImageDir = './source/images/charts';

exports.run = async function (options) {
  const nightmare = options.nightmare;
  const originalPath = `${origImageDir}/${screenshotNames[0]}`;
  const screenshotPath = `${screenshotDir}/${screenshotNames[0]}`;

  await options.loginToCharts();
  await nightmare.wait('a[href="/data-sources"]')
  await nightmare.click('a[href="/data-sources"]')
  await nightmare.wait('td.sortable-table-td')
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
