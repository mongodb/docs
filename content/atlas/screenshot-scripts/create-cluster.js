'use strict';

const screenshotNames = ['create-cluster.png'];
const screenshotDir = './screenshots-temp';
const origImageDir = './source/images/';

exports.run = async function(options) {
  const nightmare = options.nightmare;
  const originalPath = `${origImageDir}/${screenshotNames[0]}`;
  const screenshotPath = `${screenshotDir}/${screenshotNames[0]}`;

  // Go to atlas login page and login
  await options.loginToAtlas();
  await nightmare.wait('.site-header')

  // Get the screen area with the top toolbar removed
  const landingRect = await nightmare.evaluate(() => {
    const page_body = document.querySelector('.mms-body-application');
    const page_heading = document.querySelector('.site-header');
    const [rect] = page_body.getClientRects();
    const [heading_rect] = page_heading.getClientRects();
    return {
      top: rect.top + heading_rect.height, // Removing top toolbar
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.width,
      height: rect.height - heading_rect.height, // Removing top toolbar
    };
  });

  // Convert to a clip object that nightmare can use and round down pixel values
  const landingClip = {
    x: Math.floor(landingRect.left),
    y: Math.floor(landingRect.top),
    width: Math.floor(landingRect.width),
    height: Math.floor(landingRect.height)
  };

  // Click the "Build a New Cluster" button
  await nightmare.wait('a[name=buildCluster]')
  await nightmare.click('a[name=buildCluster]')

  // Close the default open accordion
  //await nightmare.wait('.accordion-headline-right')
  //await nightmare.click('.accordion-headline-right')
  await nightmare.wait(2000)

  // Prep the area for the second screenshot
  const buildRect = await nightmare.evaluate(() => {
    const page_body = document.querySelector('.mms-body-main');
    const [rect] = page_body.getClientRects();
    return {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.width,
      height: rect.height + 20, // 20px offset
    };
  });
  const buildClip = {
    x: Math.floor(buildRect.left),
    y: Math.floor(buildRect.top),
    width: Math.floor(buildRect.width),
    height: Math.floor(buildRect.height)
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
