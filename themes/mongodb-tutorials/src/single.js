import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './navbar.js'
import Search from './search.js'
import util from './util.js'

const baseURL = window.__baseURL__



class Single extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchResults: null
    }
  }

  componentDidMount() {
    util.setupCopyButtons()
    util.setupSidebar()
  }

  onResults = (results) => {
    this.setState({searchResults: results})
  }

  render () {

    return (
      <div>
        <Navbar baseURL={baseURL}>
          <Search baseURL={baseURL} onResults={this.onResults} />
        </Navbar>
      </div>
    )
  }
}

ReactDOM.render(<Single />, document.getElementById('root'))
