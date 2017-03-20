import React from 'react'
import ReactDOM from 'react-dom'

import TutorialList from './tutorialList.js'


class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      facets: [
        { name: "All", type: 'product', active: true },
        { name: "MongoDB", type: 'product', active: false },
        { name: "Atlas", type: 'product', active: false },
        { name: "Cloud Manager", type: 'product', active: false },
        { name: "Ops Manager", type: 'product', active: false },
        { name: "BI Connector", type: 'product', active: false },
        { name: "Spark Connector", type: 'product', active: false },
        { name: "All", type: 'language', active: true },
        { name: "Mongo Shell", type: 'language', active: false },
        { name: "Python", type: 'language', active: false },
        { name: "Java", type: 'language', active: false },
        { name: "Node.js", type: 'language', active: false },
        { name: "PHP", type: 'language', active: false },
        { name: "C", type: 'language', active: false },
        { name: "C++ 11", type: 'language', active: false },
        { name: "C#", type: 'language', active: false },
        { name: "Pearl", type: 'language', active: false },
        { name: "Ruby", type: 'language', active: false },
        { name: "All", type: 'topic', active: true },
        { name: "CRUD", type: 'topic', active: false },
        { name: "Aggregation", type: 'topic', active: false },
        { name: "Administration", type: 'topic', active: false },
        { name: "Security", type: 'topic', active: false },
        { name: "Replication", type: 'topic', active: false },
        { name: "Sharding", type: 'topic', active: false },
      ],
      tutorials: [
        { title: 'Connecting to MongoDB', url: '/connecting-to-mongodb', tags: { products: ['MongoDB'], languages: ['Mongo Shell', 'Node.js'] } },
        { title: 'Setting up a Replica Set', url: '/setting-up-a-replica-set', tags: { products: ['MongoDB'], languages: ['Mongo Shell'], topics: ['Replication'] } },
        { title: 'How to Compass', url: '/how-to-compass', tags: { products: ['Compass'] } },
      ],
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (event) {
    const type = event.target.getAttribute('data-type')
    const name = event.target.innerHTML

    let facets = this.state.facets
    const index = facets.findIndex(f => f.name == name && f.type == type)

    let facet = facets[index]
    facet.active = !facet.active // toggle

    this.setState({
      facets: [
        ...facets.slice(0, index),
        facet,
        ...facets.slice(index + 1, facets.length)
      ]
    })
  }

  render () {
    const genButton = (facet, i) => {
      let style = {
        backgroundColor: 'transparent'
      }

      if (facet.active) {
        style.backgroundColor = 'red'
      }

      return (
        <button key={i} style={ style } onClick={ this.handleClick } data-type = { facet.type }>
          {facet.name}
        </button>
      )
    }

    const facets = this.state.facets.map(genButton);

    const productFacets = facets.filter(f => f.props['data-type'] == 'product')
    const languageFacets = facets.filter(f => f.props['data-type'] == 'language')
    const topicFacets = facets.filter(f => f.props['data-type'] == 'topic')

    return (
      <div>
        <div className="product-facet">
          <h2>Product</h2>
          { productFacets }
        </div>
        <div className="language-facet">
          <h2>Language</h2>
          { languageFacets }
        </div>
        <div className="topic-facet">
          <h2>Topic</h2>
          { topicFacets }
        </div>
        <TutorialList tutorials={ this.state.tutorials } />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
