import React from 'react'
import {Marian} from './Marian.js'

export default class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searcher: new Marian(),
      timeout: -1,
      searchText: ''
    }

    this.state.searcher.onresults = props.onResults
    this.state.searcher.onerror = props.onError
  }

  onInput = (event) => {
    this.setState({
      searchText: event.target.value
    })

    if (this.state.timeout !== -1) {
      clearTimeout(this.state.timeout)
    }

    // This prevents users from searching before the search has loaded
    this.setState({timeout:
      this.state.timeout = setTimeout(() => {
        this.state.searcher.search(this.state.searchText, 'tutorials-master')
      }, 250)})
  }

  render() {
    return (
      <input type="search"
             className="tutorial-search"
             placeholder="Search Tutorials"
             value={this.state.searchText}
             onInput={this.onInput}
      />
    )
  }
}
