export default class SearchChannel {
  constructor(baseURL, url) {
    this.worker = new Worker(baseURL + '/worker-search.js')

    this.pending = null
    this.busy = false

    this.loaded = false
    this.loadingTime = null
    this.loadWaiter = new Promise((resolve) => {
      this.worker.onmessage = (ev) => {
        if (ev.data.loaded) {
          this.loaded = true
          this.loadingTime = ev.data.loaded
          return resolve(this.loadingTime)
        }

        if (ev.data.results) {
          this.onresults(ev.data.results)
        }

        this.busy = false

        if (this.pending !== null) {
          this.search(this.pending)
        }
      }
    })

    this.worker.postMessage({ 'load': baseURL + url })
    this.onresults = (results) => {}
  }

  search(query) {
    if (!this.busy) {
      if (!query) {
        this.onresults([])
      } else {
        this.worker.postMessage({ 'search': query })
        this.busy = true
      }
      this.pending = null
    } else {
      this.pending = query
    }
  }

  load() {
    if (this.loadingTime !== null) {
      return new Promise((resolve, reject) => resolve(this.loadingTime))
    }
    return this.loadWaiter
  }
}
