import React from 'react'
import ReactDOM from 'react-dom'

import Search from './search.js'
import TutorialList from './tutorialList.js'
import util from './util.js'
import 'whatwg-fetch'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchResults: null,
      tutorials: [],
      assetsPrefix: JSON.parse(props.mainprops).assetsPrefix.replace(/\/+$/, '') || '',
    }
  }

  componentDidMount () {
    fetch(this.state.assetsPrefix + '/tags.json').then((response) => {
      return response.json()
    }).then((data) => {
      this.setState({
        tutorials: data.tutorials,
      })
    }).catch((err) => {
      console.error(err)
    })

    util.setupFeedback()
  }

  onResults = (results) => {
    this.setState({searchResults: results.results})
  }

  onError = (msg) => {
    console.error(msg)
  }

  render () {
    let tutorials = this.state.tutorials.slice()

    if (this.state.searchResults !== null) {
      const tutorialsSet = new Set(tutorials.map(tutorial => tutorial.url))
      tutorials = this.state.searchResults.filter(result => {
        const slug = result.url.match(/(\/[^/]+)\/index\.html$/)
        if (slug) {
          result.url = slug[1]
        }

        return tutorialsSet.has(result.url)
      }).map(tutorial => {
        return tutorials.find(t => t.url === tutorial.url)
      })
    }

    return (
      <div className="main">
        <div className="main__content">
          <div className="tutorial-search__wrapper">
            <Search baseURL={this.state.assetsPrefix} onResults={this.onResults} onError={this.onError} />
          </div>

          <h1 className="main__title">Tutorials</h1>
          <TutorialList tutorials={ tutorials } baseURL={this.state.assetsPrefix} />
        </div>
      </div>
    )
  }
}

const main = document.getElementById('main')
ReactDOM.render(<App {...(main.dataset)} />, main)
