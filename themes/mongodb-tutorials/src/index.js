import React from 'react'
import ReactDOM from 'react-dom'


class App extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <div className="product-facet">
          <h2>Product</h2>
          <button>All</button>
          <button>MongoDB</button>
          <button>Atlas</button>
          <button>Cloud Manager</button>
          <button>Ops Manager</button>
          <button>BI Connector</button>
          <button>Spark Connector</button>
        </div>
        <div className="language-facet">
          <h2>Language</h2>
          <button>All</button>
          <button>Mongo Shell</button>
          <button>Python</button>
          <button>Java</button>
          <button>Node.js</button>
          <button>PHP</button>
          <button>C</button>
          <button>C++ 11</button>
          <button>C#</button>
          <button>Pearl</button>
          <button>Ruby</button>
        </div>
        <div className="topic-facet">
          <h2>Topic</h2>
          <button>All</button>
          <button>CRUD</button>
          <button>Aggregation</button>
          <button>Administration</button>
          <button>Security</button>
          <button>Replication</button>
          <button>Sharding</button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))