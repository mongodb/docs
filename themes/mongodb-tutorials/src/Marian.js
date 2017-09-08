class TabStrip {
    constructor(initialSelection, tabs, onclick) {
        this.tabs = tabs
        this.element = document.createElement('ul')
        this.element.className = 'tab-strip'
        this.element.role = 'tablist'

        tabs.forEach((tab) => {
            const tabElement = document.createElement('li')
            tabElement.role = 'tab'
            tabElement.className = 'tab-strip__element'
            tabElement.innerText = tab.label
            tabElement.onclick = onclick.bind(null, tab)

            this.element.appendChild(tabElement)
            tab.element = tabElement
        })

        this.update(initialSelection)
    }

    update(selectedId) {
        this.tabs.forEach((tab) => {
            if (tab.id === selectedId) {
                tab.element.setAttribute('aria-selected', true)
            } else {
                tab.element.setAttribute('aria-selected', false)
            }
        })
    }
}

export default class Marian {
    constructor(url, defaultProperties, defaultPropertiesLabel, initialSearchProperty, initialQuery) {
        this.url = url.replace(/\/+$/, '')
        this.defaultProperties = defaultProperties
        this.onchangequery = () => {}

        this.container = document.createElement('div')
        this.container.className = 'marian'

        this.spinnerElement = document.createElement('div')
        this.spinnerElement.className = 'spinner'

        this.currentRequest = null

        this.query = initialQuery
        this.searchProperty = initialSearchProperty

        // We have three options to search: the current site, the current MongoDB manual,
        // and all properties.
        const tabStripElements = []
        if (defaultPropertiesLabel) {
            tabStripElements.push({id: 'current', label: `${defaultPropertiesLabel}`})

            if (!this.searchProperty) {
                this.searchProperty = 'current'
            }
        }

        if (!defaultPropertiesLabel || !defaultPropertiesLabel.match(/^MongoDB Manual/)) {
            tabStripElements.push({id: 'manual', label: 'MongoDB Manual'})

            if (!this.searchProperty) {
                this.searchProperty = 'manual'
            }
        }

        tabStripElements.push({id: 'all', label: 'All Results'})

        const tabStrip = new TabStrip(this.searchProperty, tabStripElements, (tab) => {
            tabStrip.update(tab.id)
            this.searchProperty = tab.id
            this.search(this.query)
        })

        const titleElement = document.createElement('div')
        titleElement.className = 'marian__heading'
        titleElement.innerText = 'Search Results'

        this.listElement = document.createElement('ul')
        this.listElement.className = 'marian-results'
        this.container.appendChild(titleElement)
        this.container.appendChild(tabStrip.element)
        this.container.appendChild(this.spinnerElement)
        this.container.appendChild(this.listElement)

        this.bodyElement = null
        document.addEventListener('DOMContentLoaded', () => {
            const rootElement = [
                document.querySelector('.main-column'),
                document.querySelector('.main'),
                document.body].filter((el) => Boolean(el))[0]

            rootElement.appendChild(this.container)

            const candidates = ['.main__cards', '.main__content', '.document']
            for (let i = 0; i < candidates.length; i += 1) {
                const candidate = candidates[i]
                this.bodyElement = document.querySelector(candidate)
                if (this.bodyElement) { break }
            }

            // If we can't find a page body, just use a dummy element
            if (!this.bodyElement) {
                this.bodyElement = document.createElement('div')
            }

            this.search(this.query)
        })
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

        if (this.currentRequest !== null) { this.currentRequest.abort() }
        const request = new XMLHttpRequest()
        this.currentRequest = request
        let requestUrl = this.url + '/search?q=' + encodeURIComponent(query)

        if (this.defaultProperties.length && this.searchProperty === 'current') {
            requestUrl += `&searchProperty=${encodeURIComponent(this.defaultProperties)}`
        } else if (this.searchProperty === 'manual') {
            requestUrl += '&searchProperty=manual-current'
        }

        this.listElement.innerText = ''
        this.spinnerElement.className = 'spinner'
        request.open('GET', requestUrl)
        request.onreadystatechange = (ev) => {
            if (request.readyState !== 4) {
                return
            }

            this.currentRequest = null
            this.spinnerElement.className = 'spinner spinner--hidden'

            if (!request.responseText) {
                if (request.status === 400) {
                    this.renderError('Search request too long')
                } else if (request.status === 503) {
                    this.renderError('Search server is temporarily unavailable')
                } else if (request.status !== 0) {
                    this.renderError('Error receiving search results')
                }

                return
            }

            const data = JSON.parse(request.responseText)
            this.render(data, query)
        }
        request.onerror = () => {
            this.renderError('Network error when receiving search results')
        }

        request.send()
    }

    render(data, query) {
        const spellingErrors = Object.keys(data.spellingCorrections)
        if (spellingErrors.length > 0) {
            let corrected = query
            spellingErrors.forEach((orig) => {
                corrected = corrected.replace(orig, data.spellingCorrections[orig])
            })

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

        data.results.forEach((result) => {
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
        })
    }

    renderError(message) {
        console.error(message)
        const li = document.createElement('li')
        li.className = 'marian-result'
        li.innerText = message
        this.listElement.appendChild(li)
    }
}
