'use strict';

const screenshotNames = ['clusterselect.png'];
const screenshotDir = './screenshots-temp';
const origImageDir = './source/images';

exports.run = async function (options) {
  const nightmare = options.nightmare;
  const originalPath = `${origImageDir}/${screenshotNames[0]}`;
  const screenshotPath = `${screenshotDir}/${screenshotNames[0]}`;

  await options.loginToAtlas()
  await nightmare.wait(2000)
  await nightmare.wait('.mms-body-main')
  await nightmare.wait('a[name=buildCluster]')
  await nightmare.click('a[name=buildCluster]')
  await nightmare.wait(2000)
  await nightmare.wait('.mms-body-main')
  await nightmare.wait('section.accordion:nth-child(2) > div:nth-child(1) > div:nth-child(1)')
  await nightmare.click('section.accordion:nth-child(2) > div:nth-child(1) > div:nth-child(1)')
  await nightmare.wait(1000)

  const button_clip = await nightmare.evaluate(() => {
  // store the button in a variable
  const build_cluster_btn = document.querySelector('section.accordion:nth-child(2)');
  
  // use the getClientRects() function on the button to determine
  // the size and location
  const [rect] = build_cluster_btn.getClientRects();
  console.log([rect]);
  // convert the rectangle to a clip object and return it
  return {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    width: rect.width+800,
    height: rect.height
  };
  })
  const buildClip = {
    x: Math.floor(button_clip.left)-20,
    y: Math.floor(button_clip.top)-20,
    width: Math.floor(button_clip.width)+40,
    height: Math.floor(button_clip.height)+40
  };
  await nightmare.screenshot(screenshotPath, buildClip)
  await nightmare.wait(500)
  await nightmare.end();

  return [[originalPath, screenshotPath]];
}

exports.nightmare_props = {
    show: true,
    typeInterval: 20,
    height: 1500,
    width: 1000, 
    webPreferences: {
      zoomFactor: .9 
    }
}
