class TabStrip {
    constructor(initialSelection, tabs, onclick) {
        this.tabs = tabs
        this.element = document.createElement('ul')
        this.element.className = 'tab-strip'
        this.element.role = 'tablist'

        for (const tab of tabs) {
            const tabElement = document.createElement('li')
            tabElement.role = 'tab'
            tabElement.className = 'tab-strip__element'
            tabElement.innerText = tab.label
            tabElement.onclick = onclick.bind(null, tab)

            this.element.appendChild(tabElement)
            tab.element = tabElement
        }

        this.update(initialSelection)
    }

    update(selectedId) {
        for (const tab of this.tabs) {
            if (tab.id === selectedId) {
                tab.element.setAttribute('aria-selected', true)
            } else {
                tab.element.setAttribute('aria-selected', false)
            }
        }
    }
}

export default class Marian {
    constructor(url, defaultProperties, defaultPropertiesLabel, rootElement) {
        this.url = url.replace(/\/+$/, '')
        this.defaultProperties = defaultProperties
        this.onchangequery = () => {}

        this.container = document.createElement('div')
        this.container.className = 'marian'

        this.query = ''
        this.searchAllProperties = false

        const tabStrip = new TabStrip('current', [
            {id: 'current', label: `${defaultPropertiesLabel}`},
            {id: 'all', label: 'All Results'}
        ], (tab) => {
            tabStrip.update(tab.id)
            this.searchAllProperties = (tab.id === 'all')
            this.search(this.query)
        })

        const titleElement = document.createElement('h3')
        titleElement.innerText = 'Search Results'

        this.listElement = document.createElement('ul')
        this.listElement.className = 'marian-results'
        this.container.appendChild(titleElement)
        this.container.appendChild(tabStrip.element)
        this.container.appendChild(this.listElement)
        rootElement.appendChild(this.container)

        // When we show our search results, the page body should go away
        const candidateSelectors = ['.main__content', '.main-column']
        for (const candidate of candidateSelectors) {
            this.bodyElement = document.querySelector(candidate)
            if (this.bodyElement) { break }
        }

        // If we can't find a page body, just use a dummy element
        if (!this.bodyElement) {
            this.bodyElement = document.createElement('div')
        }
    }

    show() {
        this.container.className = 'marian marian--shown'
        this.bodyElement.style.display = 'none'
    }

    hide() {
        this.container.className = 'marian'
        this.bodyElement.style.removeProperty('display')
    }

    search(query) {
        this.query = query
        if (!query) {
            this.listElement.innerText = ''
            this.hide()
            return
        }

        this.show()
        const request = new XMLHttpRequest()
        let requestUrl = this.url + '/search?q=' + encodeURIComponent(query)

        if (this.defaultProperties.length && !this.searchAllProperties) {
            requestUrl += `&searchProperty=${encodeURIComponent(this.defaultProperties)}`
        }

        request.open('GET', requestUrl)
        request.onreadystatechange = (ev) => {
            if (request.readyState !== 4) {
                return
            }

            if (!request.responseText) {
                console.error('Error receiving search results')
                return
            }

            this.listElement.innerText = ''
            const data = JSON.parse(request.responseText)

            const spellingErrors = Object.keys(data.spellingCorrections)
            if (spellingErrors.length > 0) {
                let corrected = query
                for (const orig of spellingErrors) {
                    corrected = corrected.replace(orig, data.spellingCorrections[orig])
                }

                const li = document.createElement('li')
                const correctLink = document.createElement('a')
                correctLink.onclick = () => {
                    this.onchangequery(corrected)
                }
                li.className = 'marian-result'
                correctLink.className = 'marian-spelling-correction'
                correctLink.innerText = `Did you mean: ${corrected}`
                li.appendChild(correctLink)
                this.listElement.appendChild(li)
            }

            for (const result of data.results) {
                const li = document.createElement('li')
                li.className = 'marian-result'

                const titleLink = document.createElement('a')
                titleLink.innerText = result.title
                titleLink.className = 'marian-title'
                titleLink.href = result.url

                const previewElement = document.createElement('div')
                previewElement.innerText = result.preview
                previewElement.className = 'marian-preview'

                li.appendChild(titleLink)
                li.appendChild(previewElement)
                this.listElement.appendChild(li)
            }
        }

        request.send()
    }
}
