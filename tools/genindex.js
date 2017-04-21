#!/usr/bin/env node
'use strict'

const __doc__ = `
Usage:
  genindex.js --config=<path>
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
const marked = require('marked')

const PAT_HEADMATTER = /^\+\+\+\n([^]+)\n\+\+\+/
const SNIPPET_LENGTH = 175

function makeRenderer() {
    const renderer = new marked.Renderer()
    let lastLevel = 0

    renderer.heading = function(text, level, raw) {
        var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')

        let prefix = ''
        if (level <= lastLevel) {
            prefix = '\n</section>'.repeat(lastLevel - level + 1)
        }
        lastLevel = level

        return prefix + '\n<section>\n<h'
            + level
            + ' id="'
            + this.options.headerPrefix
            + raw.toLowerCase().replace(/[^\w]+/g, '-')
            + '">'
            + text
            + '</h'
            + level
            + '>\n'
    }

    renderer.flush = function() {
        return '\n</section>'.repeat(lastLevel)
    }

    return renderer
}

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

function getTreeText(tree) {
    const text = []
    for (let i = 1; i < tree.length; i += 1) {
        const child = tree[i]
        if (Array.isArray(child)) {
            text.push(...getTreeText(child))
        } else {
            text.push(child)
        }
    }

    return text
}

function scanTree(tree, searchDoc) {
    const root = tree[0]
    for (let i = 1; i < tree.length; i += 1) {
        const child = tree[i]
        if (Array.isArray(child)) {
            if (/h[0-6]/.test(child[0])) {
                const level = parseInt(child[0][1])

                for (let j = i; j < tree.length; j += 1) {

                }

                // Inject a <section> tag
                tree[i] = ['section', [child].concat(tree.splice(i))]
                if (!searchDoc.title) {
                    searchDoc.title = getTreeText(child).join(' ')
                } else {
                    searchDoc.minorTitles.push(getTreeText(child).join(' '))
                }
            }

            scanTree(child, searchDoc)
        } else {
            searchDoc.body.push(child)
        }
    }
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

    const searchDoc = {
        id: searchIndex.docId,
        title: headmatter.title,
        tags: Object.keys(headmatter.tags),
        minorTitles: [],
        body: []
    }
    searchIndex.docId += 1
    searchIndex.slugs.push(headmatter.slug)

    const renderer = makeRenderer()
    const html = marked(rawdata.slice(match[0].length), { renderer: renderer }) + renderer.flush()
    // const tree = markdown.toHTMLTree(rawdata.slice(match[0].length))
    // scanTree(tree, searchDoc)
    // console.log(tree)
    searchDoc.body = searchDoc.body.join(' ')
    // const html = markdown.renderJsonML(tree)
    searchIndex.idx.add(searchDoc)

    let tags = []

    for (const tag of Object.keys(headmatter.tags)) {
      tags.push({
        facet: headmatter.tags[tag],
        name: tag,
      })
    }

    return {
        html: html,
        headmatterSource: match[0],
        headmatter: {
            url: headmatter.slug,
            title: headmatter.title,
            snippet: searchDoc.body.substring(0, SNIPPET_LENGTH),
            options: tags,
        }
    }
}

function main() {
    const args = docopt.docopt(__doc__)
    const tutorials = []
    const config = toml.parse(fs.readFileSync(args['--config']))
    const tagManifest = config.tags || {}
    let error = false

    const sourceContentDir = config.sourceContentDir.replace(/\/$/, '')
    const outputContentDir = config.contentDir.replace(/\/$/, '')

    try {
        fs.mkdirSync(outputContentDir)
    } catch (error) {}

    for (const path of walk(sourceContentDir)) {
        let doc
        try {
            doc = processFile(path)
        } catch(err) {
            console.error(`Error processing ${path}: ${err}`)
            error = true
            continue
        }

        doc.headmatter.options.forEach(function(option) {
          if (tagManifest[option.name] === undefined) {
            console.error(`Unknown tag "${option}" in ${path}`)
            error = true
          }
        })

        tutorials.push(doc.headmatter)
        const outputPath = path.replace(sourceContentDir, outputContentDir).replace(/\.[a-z]+$/, '.html')
        fs.writeFileSync(outputPath, doc.headmatterSource + '\n' + doc.html)
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

    try {
        fs.mkdirSync('public')
    } catch (error) {}

    fs.writeFileSync('public/tags.json', JSON.stringify({
        tags: tags,
        tutorials: tutorials
    }))

    const searchIndexJSON = searchIndex.toJSON()
    fs.writeFileSync('public/search.json', JSON.stringify(searchIndexJSON))
}

main()
