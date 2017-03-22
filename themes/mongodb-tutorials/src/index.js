import React from 'react'
import ReactDOM from 'react-dom'

import Facet from './facet.js'
import TutorialList from './tutorialList.js'


class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      facets: {
        product: [
          { name: "MongoDB", active: false },
          { name: "Atlas", active: false },
          { name: "Cloud Manager", active: false },
          { name: "Ops Manager", active: false },
          { name: "BI Connector", active: false },
          { name: "Spark Connector", active: false },
        ],
        language: [
          { name: "Mongo Shell", active: false },
          { name: "Python", active: false },
          { name: "Java", active: false },
          { name: "Node.js", active: false },
          { name: "PHP", active: false },
          { name: "C", active: false },
          { name: "C++ 11", active: false },
          { name: "C#", active: false },
          { name: "Pearl", active: false },
          { name: "Ruby", active: false },
        ],
        topic: [
          { name: "CRUD", active: false },
          { name: "Aggregation", active: false },
          { name: "Administration", active: false },
          { name: "Security", active: false },
          { name: "Replication", active: false },
          { name: "Sharding", active: false },
        ],
      },
      tutorials: [
        { title: 'Connecting to MongoDB', url: '/connecting-to-mongodb', tags: { products: ['MongoDB'], languages: ['Mongo Shell', 'Node.js'] } },
        { title: 'Setting up a Replica Set', url: '/setting-up-a-replica-set', tags: { products: ['MongoDB'], languages: ['Mongo Shell'], topics: ['Replication'] } },
        { title: 'How to Compass', url: '/how-to-compass', tags: { products: ['Compass'] } },
      ],
    }

    this.updateFacet = this.updateFacet.bind(this)
  }

  updateFacet (event) {
    const facetName = event.target.getAttribute('data-facet-name')
    const optionName = event.target.innerHTML

    let facet = this.state.facets[facetName]

    if (optionName == 'All') {
      facet = facet.map(option => {
        option.active = false
        return option
      })
    } else {
      const index = facet.findIndex(option => option.name == optionName)

      let option = facet[index]
      option.active = !option.active

      facet = [
        ...facet.slice(0, index),
        option,
        ...facet.slice(index + 1, facet.length)
      ]
    }

    let facets = this.state.facets
    facets[facetName] = facet

    this.setState({ facets: facets })
  }

  render () {
    const facets = Object.keys(this.state.facets).map((facet, i) => {
      const options = this.state.facets[facet]
      return <Facet key={i} name={facet} options={options} updateFacet={this.updateFacet} />
    })

    return (
      <div>
        { facets }
        <TutorialList tutorials={ this.state.tutorials } />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
