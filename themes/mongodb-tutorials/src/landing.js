import util from './util.js'

document.addEventListener("DOMContentLoaded", event => {
  util.setupSidebar()
  util.setupList()
  util.setupFeedback()

  // only on the home landing page
  if (document.getElementById('code-widget')) {
    util.setupCodeWidget()
  }
})
