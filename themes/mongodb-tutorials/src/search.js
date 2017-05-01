import React from 'react'

import SearchChannel from './SearchChannel.js'

export default class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searcher: new SearchChannel(props.baseURL, '/search.json'),
      timeout: -1,
      loaded: false,
      searchText: ''
    }


    this.state.searcher.load().then(() => {
      this.setState({loaded: true})
    }).catch((err) => console.error(err))

    this.state.searcher.onresults = props.onResults
  }

  get placeholder() {
    if (!this.state.searcher.loaded) {
      return 'Loading...'
    }

    return 'search by keywords'
  }

  onInput = (event) => {
    this.setState({
      searchText: event.target.value
    })

    if (this.state.timeout !== -1) {
      clearTimeout(this.state.timeout)
    }

    this.setState({timeout:
      this.state.timeout = setTimeout(() => {
        this.state.searcher.search(this.state.searchText)
      }, 250)})
  }

  render() {
    return <input type="search" className="navbar-search" placeholder={this.placeholder} value={this.state.searchText} disabled={!this.state.searcher.loaded} onInput={this.onInput} />
  }
}
