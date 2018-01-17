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

export class Marian {
    constructor() {
        this.currentRequest = null
        this.onresults = () => {}
        this.onerror = () => {}
    }

    search(query, properties) {
        if (!query) {
            this.onresults({
                results: null,
                spellingCorrections: {}}, query)
            return
        }

        if (this.currentRequest !== null) { this.currentRequest.abort() }
        const request = new XMLHttpRequest()
        this.currentRequest = request
        let requestUrl = 'https://marian.mongodb.com/search?q=' + encodeURIComponent(query)

        if (properties) {
            requestUrl += `&searchProperty=${encodeURIComponent(properties)}`
        }

        request.open('GET', requestUrl)
        request.onreadystatechange = () => {
            if (request.readyState !== 4) {
                return
            }

            this.currentRequest = null

            if (!request.responseText) {
                if (request.status === 400) {
                    this.onerror('Search request too long')
                } else if (request.status === 503) {
                    this.onerror('Search server is temporarily unavailable')
                } else if (request.status !== 0) {
                    this.onerror('Error receiving search results')
                }

                return
            }

            const data = JSON.parse(request.responseText)
            this.onresults(data, query)
        }

        request.onerror = () => {
            this.onerror('Network error when receiving search results')
        }

        request.send()
    }
}

export class MarianUI {
    constructor(defaultProperties, defaultPropertiesLabel) {
        this.marian = new Marian()
        this.marian.onerror = this.renderError.bind(this)
        this.marian.onresults = this.render.bind(this)

        this.defaultProperties = defaultProperties
        this.onchangequery = () => {}

        this.container = document.createElement('div')
        this.container.className = 'marian'

        this.spinnerElement = document.createElement('div')
        this.spinnerElement.className = 'spinner'

        this.query = ''
        this.searchProperty = ''

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

        this.tabStrip = new TabStrip(this.searchProperty, tabStripElements, (tab) => {
            this.tabStrip.update(tab.id)
            this.searchProperty = tab.id
            this.search(this.query)
        })

        const titleElement = document.createElement('div')
        titleElement.className = 'marian__heading'
        titleElement.innerText = 'Search Results'

        this.listElement = document.createElement('ul')
        this.listElement.className = 'marian-results'
        this.container.appendChild(titleElement)
        this.container.appendChild(this.tabStrip.element)
        this.container.appendChild(this.spinnerElement)
        this.container.appendChild(this.listElement)

        this.query = this.parseUrl()

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

    pushHistory() {
        const locationSansQuery = window.location.href.replace(/\?[^#]*/, '')

        let newURL
        if (this.query) {
            newURL = `${locationSansQuery}?searchProperty=${encodeURIComponent(this.searchProperty)}&query=${encodeURIComponent(this.query)}`
        } else {
            newURL = locationSansQuery
        }

        window.history.replaceState({href: newURL}, null, newURL)
    }

    parseUrl() {
        let locationSearchProperty = window.location.search.match(/searchProperty=([^&#]*)/)
        locationSearchProperty = (locationSearchProperty !== null)? decodeURIComponent(locationSearchProperty[1]) : ''
        if (locationSearchProperty) {
            this.searchProperty = locationSearchProperty
            this.tabStrip.update(this.searchProperty)
        }

        let locationQuery = window.location.search.match(/query=([^&#]*)/)
        return (locationQuery !== null)? decodeURIComponent(locationQuery[1]) : ''
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
        this.pushHistory()
        if (!query) {
            this.listElement.innerText = ''
            this.hide()
            return
        }

        this.show()

        let searchProperty = ''
        if (this.defaultProperties.length && this.searchProperty === 'current') {
            searchProperty = this.defaultProperties
        } else if (this.searchProperty === 'manual') {
            searchProperty = 'manual-current'
        }

        this.listElement.innerText = ''
        this.spinnerElement.className = 'spinner'
        this.marian.search(query, searchProperty)
    }

    render(data, query) {
        this.spinnerElement.className = 'spinner spinner--hidden'

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
        this.spinnerElement.className = 'spinner spinner--hidden'

        const li = document.createElement('li')
        li.className = 'marian-result'
        li.innerText = message
        this.listElement.appendChild(li)
    }
}
