'use strict'

const screenshotNames = ['atlas-metrics.png'];
const screenshotDir = './screenshots-temp';
const origImageDir = './source/images/';

exports.run = async function(options) {
  const nightmare = options.nightmare;
  const originalPath = `${origImageDir}/${screenshotNames[0]}`;
  const screenshotPath = `${screenshotDir}/${screenshotNames[0]}`;

  // Go to atlas login page and login
  await options.loginToAtlas();
  await nightmare.wait('a.cluster-detail-hostname')
  await nightmare.click('a.cluster-detail-hostname')
  await nightmare.evaluate(() => document.querySelector('li.section-header-tab:nth-child(3) a'))
  await nightmare.wait('li.section-header-tab:nth-child(3) a')
  await nightmare.click('li.section-header-tab:nth-child(3) a')
  await nightmare.wait(1500)
  const page_clip = await nightmare.evaluate(() => {
    var page_body = document.querySelector('.mms-body-application');
    var page_heading = document.querySelector('.site-header');
    var [rect] = page_body.getClientRects();
    var [heading_rect] = page_heading.getClientRects();
    return {
      top: rect.top + heading_rect.height,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
  });
  const buildClip = {
    x: Math.floor(page_clip.left),
    y: Math.floor(page_clip.top),
    width: Math.floor(page_clip.width),
    height: Math.floor(page_clip.height)
  };
  await nightmare.screenshot(screenshotPath, buildClip)
  await nightmare.wait(500)
  await nightmare.end();

 return [[originalPath, screenshotPath]];
}

exports.nightmare_props = {
    show: true,
    typeInterval: 20,
    height: 1000,
    width: 1500,
    webPreferences: {
      zoomFactor: 1.0
    }
}
