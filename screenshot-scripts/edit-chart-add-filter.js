'use strict';

const screenshotNames = ['order-tutorial-edit-add-filter.png'];
const screenshotDir = './screenshots-temp';
const origImageDir = './source/images/charts';

exports.run = async function (options) {
  const nightmare = options.nightmare;
  const originalPath = `${origImageDir}/${screenshotNames[0]}`;
  const screenshotPath = `${screenshotDir}/${screenshotNames[0]}`;

  await nightmare.goto('http://charts.mongodb.parts/dashboards/b2ca1d56-2843-4c8d-acd2-193d445eb7da')
  await nightmare.wait('div.react-grid-item:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > a:nth-child(1)')
  await nightmare.click('div.react-grid-item:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > a:nth-child(1)')
  await nightmare.wait('.CodeMirror > div:nth-child(1) > textarea:nth-child(1)')
  await nightmare.type('.CodeMirror > div:nth-child(1) > textarea:nth-child(1)', '{$and: [{storeLocation: "Denver"}, {saleDate: {"$gte": ISODate("2017-01-01T00:00:00.000Z")}}, {saleDate: {"$lte": ISODate("2017-12-31T00:00:00.000Z")}}]}')
  await nightmare.wait(2000)
  await nightmare.click('button.btn-primary:nth-child(1)')
  await nightmare.wait(5000)
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
