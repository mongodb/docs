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
const SNIPPET_LENGTH = 220

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function makeRenderer() {
    const renderer = new marked.Renderer()
    let lastLevel = 0

    renderer.heading = function(text, level, raw) {
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

    renderer.code = function(code, lang) {
        if (!lang) {
            return '<div class="highlight"><pre><code>' + escape(code) + '\n</code></pre></div>'
        }

        return `{{< highlight ${escape(lang, true)} >}}`
            + code
            + '\n{{< /highlight >}}\n'
    }

    renderer.flush = function() {
        return '\n</section>'.repeat(lastLevel)
    }

    return renderer
}

// Creates a renderer to render HTML without headings for snippets and
// make the removed headings available (for the searchDoc)
function makeHeadingRemover() {
  const renderer = new marked.Renderer()
  let headings = []
  
  renderer.heading = function(text, level, raw) {
    headings.push(text)
    return ''
  }

  renderer.headings = headings
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

    const renderer = makeRenderer()
    const html = marked(rawdata.slice(match[0].length), { renderer: renderer }) + renderer.flush()
    
    const headingRemover = makeHeadingRemover()
    const htmlNoHeadings = marked(rawdata.slice(match[0].length), { renderer: headingRemover })
    // Remove HTML tags, quotation mark entities, and single quote entities
    const paragraphText = htmlNoHeadings.replace(/<(?:.|\n)*?>/gm, '')
        .replace(/&quot;/g, '\"')
        .replace(/&#39;/g, '\'')

    const searchDoc = {
        id: searchIndex.docId,
        title: headmatter.title,
        tags: headmatter.tags,
        minorTitles: headingRemover.headings,
        body: paragraphText
    }

    searchIndex.docId += 1
    searchIndex.slugs.push(headmatter.slug)

    searchIndex.idx.add(searchDoc)

    return {
        html: html,
        headmatterSource: match[0],
        headmatter: {
            url: headmatter.slug,
            title: headmatter.title,
            snippet: paragraphText.substring(0, SNIPPET_LENGTH) + '...',
            options: headmatter.tags,
        }
    }
}

function main() {
    const args = docopt.docopt(__doc__)
    const tutorials = []
    const config = toml.parse(fs.readFileSync(args['--config']))
    const tagManifest = config.tags || []
    const tagIndexes = new Map()
    const tagMap = new Map(tagManifest.map((tag, index) => {
        tagIndexes.set(tag.id, index)
        return [tag.id, tag]
    }))
    let error = false

    const sourceContentDir = config.sourceContentDir.replace(/\/$/, '')
    const outputContentDir = config.contentDir.replace(/\/$/, '')

    try {
        fs.mkdirSync(outputContentDir)
    } catch (error) {}

    for (const path of walk(sourceContentDir)) {
        if (pathModule.extname(path) !== '.md') {
            continue
        }

        let doc
        try {
            doc = processFile(path)
        } catch(err) {
            console.error(`Error processing ${path}: ${err}`)
            error = true
            continue
        }

        doc.headmatter.options.forEach(function(option) {
          if (!tagMap.has(option)) {
            console.error(`Unknown tag "${option}" in ${path}`)
            error = true
          }
        })

        // Add facet and title information
        doc.headmatter.options = doc.headmatter.options.map(option => tagMap.get(option))

        // Ensure that tags have a consistent order defined by the config file
        doc.headmatter.options.sort((a, b) => {
            return tagIndexes.get(a.id) - tagIndexes.get(b.id)
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
      let tagWithId = tagManifest[tag]
      tagWithId.id = tag
      tags.push(tagWithId)
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
