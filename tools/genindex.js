#!/usr/bin/env node
'use strict'

const __doc__ = `
Usage:
  genindex.js <source> <outputIndex> <outputTags> --config=<path>
`

const assert = require('assert')
const child_process = require('child_process')
const fs = require('fs')
const pathModule = require('path')
const process = require('process')

const docopt = require('docopt')
const sax = require('sax')
const toml = require('toml')
const lunr = require('lunr')

const PAT_HEADMATTER = /^\+\+\+\n([^]+)\n\+\+\+/
const SNIPPET_LENGTH = 175

// Recursively step through an object and replace any numbers with a number
// representable in a short ASCII string.
function truncateNumbers(r) {
    if (!(r instanceof Object)) { return }
    for (let child of Object.keys(r)) {
        if (typeof r[child] === 'number') {
            r[child] = Number((r[child]).toString().slice(0, 10))
        }
        truncateNumbers(r[child])
    }
}

const searchIndex = {
    idx: lunr(function () {
        this.ref('id')
        this.field('title', { boost: 20 })
        this.field('tags', { boost: 15 })
        this.field('minorTitles', { boost: 5 })
        this.field('body')
    }),
    docId: 0,
    slugs: [],
    toJSON: function() {
        truncateNumbers(searchIndex.idx.tokenStore.tokens)
        searchIndex.idx.tokenStore.compress()
        const json = searchIndex.idx.toJSON()
        json.slugs = searchIndex.slugs
        return json
    }
}

function* walk(root) {
    const openList = [root]
    const closedList = new Set()
    while (openList.length) {
        const currentRoot = openList.pop()
        closedList.add(currentRoot)

        for (const filename of fs.readdirSync(currentRoot)) {
            const path = currentRoot + '/' + filename
            const stat = fs.statSync(path)
            if (stat.isFile()) {
                yield path
            } else if (stat.isDirectory() && !closedList.has(path)) {
                openList.push(path)
            }
        }
    }
}

function parseXML(path, headmatter, xml) {
    const spawnOutput = child_process.spawnSync('mmark', ['-xml'], {encoding: 'utf-8', input: xml})
    if (spawnOutput.status != 0) {
        throw new Error('Command "mmark" failed')
    }

    const text = `<root>${spawnOutput.output[1]}</root>`
    const parser = sax.parser(true, {
        trim: true,
        normalize: true
    })

    const doc = {
        id: searchIndex.docId,
        title: headmatter.title,
        tags: Object.keys(headmatter.tags),
        minorTitles: [],
        body: []
    }
    searchIndex.docId += 1
    searchIndex.slugs.push(headmatter.slug)

    let sectionDepth = 0
    let inName = false
    let error = false

    parser.onerror = function (error) {
        console.error('Error parsing ' + path)
        console.error(error)
        error = true
    }

    parser.ontext = function (text) {
        if (inName) {
            assert.ok(sectionDepth >= 1)
            if (sectionDepth === 1) {
                doc.title += ' ' + text
            } else {
                doc.minorTitles.push(text)
            }

            return
        }

        doc.body.push(text)
    }

    parser.onopentag = function (node) {
        if (node.name === 'section') {
            sectionDepth += 1
        } else if (node.name === 'name') {
            inName = true
        }
    }

    parser.onclosetag = function (name) {
        if (name === 'section') {
            sectionDepth -= 1
        } else if (name === 'name') {
            assert.equal(inName, true)
            inName = false
        }
    }

    parser.write(text).close()
    if (error) { throw new Error('Parse error') }

    doc.title = doc.title.trim()
    doc.body = doc.body.join(' ').trim()

    return doc
}

function processFile(path) {
    const rawdata = fs.readFileSync(path, { encoding: 'utf-8' })
    const match = rawdata.match(PAT_HEADMATTER)
    if (!match) {
        throw new Error('Couldn\'t find headmatter')
    }

    const rawHeadmatter = match[1]
    const headmatter = toml.parse(rawHeadmatter)
    if (!headmatter.slug) {
      headmatter.slug = '/' + pathModule.parse(path).name
    }

    const searchDoc = parseXML(path, headmatter, rawdata.slice(match[0].length))
    searchIndex.idx.add(searchDoc)

    let tags = []

    for (const tag of Object.keys(headmatter.tags)) {
      tags.push({
        facet: headmatter.tags[tag],
        name: tag,
      })
    }

    return {
      url: headmatter.slug,
      title: headmatter.title,
      snippet: searchDoc.body.substring(0, SNIPPET_LENGTH),
      options: tags,
    }
}

function main() {
    const args = docopt.docopt(__doc__)
    const data = []
    const tagManifest = toml.parse(fs.readFileSync(args['--config'])).tags || {}
    let error = false

    for (const path of walk(args['<source>'])) {
        let headmatter
        try {
            headmatter = processFile(path)
        } catch(err) {
            console.error(`Error processing ${path}: ${err}`)
            error = true
            continue
        }

        headmatter.options.forEach(function(option) {
          if (tagManifest[option.name] === undefined) {
            console.error(`Unknown tag "${option}" in ${path}`)
            error = true
          }
        })

        data.push(headmatter)
    }

    if (error) {
        process.exit(1)
    }

    let tags = []

    for (const tag of Object.keys(tagManifest)) {
      tags.push({
        facet: tagManifest[tag],
        name: tag,
      })
    }

    fs.writeFileSync(args['<outputTags>'], JSON.stringify({
        tags: tags,
        tutorials: data
    }))

    const searchIndexJSON = searchIndex.toJSON()
    fs.writeFileSync(args['<outputIndex>'], JSON.stringify(searchIndexJSON))
}

main()
