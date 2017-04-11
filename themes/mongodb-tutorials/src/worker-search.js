'use strict'
import lunr from 'lunr'

let searchIndex = null
let slugMapping = []

function load(url) {
    let start
    return fetch(url).then((response) => {
        start = performance.now()
        return response.json()
    }).then((data) => {
        searchIndex = lunr.Index.load(data)
        slugMapping = data.slugs
        return (performance.now() - start) / 1000
    })
}

function search(query) {
    const start = performance.now()
    const results = searchIndex.search(query).map((row) => {
        return slugMapping[row.ref]
    })
    // console.log((performance.now() - start) / 1000)
    return results
}

self.onmessage = function(ev) {
    if (ev.data.load !== undefined) {
        load(ev.data.load).then((enlapsed) => {
            self.postMessage({ 'loaded': enlapsed })
        })
    } else if (ev.data.search !== undefined) {
        const results = search(ev.data.search)
        self.postMessage({ 'results': results })
    }
}
