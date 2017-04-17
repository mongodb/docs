import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './navbar.js'

class Single extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchResults: null,
    }
  }

  onResults = (results) => {
    this.setState({searchResults: results})
  }

  render () {
    return (
      <div>
        <Navbar onResults={this.onResults} />

        <div className="main">
          <aside className="main__sidebar">
            sidebar
          </aside>

        </div>
      </div>
    )
  }
}

ReactDOM.render(<Single />, document.getElementById('root'))