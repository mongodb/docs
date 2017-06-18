'use strict'
const lunr = require('lunr')

var searchIndex = null
var slugMapping = []

function load(url) {
    var start
    return fetch(url).then(function(response) {
        start = performance.now()
        return response.json()
    }).then(function(data) {
        searchIndex = lunr.Index.load(data)
        slugMapping = data.slugs
        return (performance.now() - start) / 1000
    })
}

function search(query) {
    const start = performance.now()
    const results = searchIndex.search(query).map(function(row) {
        return slugMapping[row.ref]
    })
    // console.log((performance.now() - start) / 1000)
    return results
}

self.onmessage = function(ev) {
    if (ev.data.load !== undefined) {
        load(ev.data.load).then(function(enlapsed) {
            self.postMessage({ 'loaded': enlapsed })
        })
    } else if (ev.data.search !== undefined) {
        const results = search(ev.data.search)
        self.postMessage({ 'results': results })
    }
}
