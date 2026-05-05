[
  {
    _id: 1,
    name: 'Dev',
    nearestAirport: 'JFK',
    destinations: [
      {
        _id: 0,
        airport: 'JFK',
        connects: [ 'BOS', 'ORD' ],
        numConnections: Long('0')
      },
      {
        _id: 1,
        airport: 'BOS',
        connects: [ 'JFK', 'PWM' ],
        numConnections: Long('1')
      },
      {
        _id: 3,
        airport: 'PWM',
        connects: [ 'BOS', 'LHR' ],
        numConnections: Long('2')
      },
      {
        _id: 2,
        airport: 'ORD',
        connects: [ 'JFK' ],
        numConnections: Long('1')
      }
    ]
  },
  {
    _id: 2,
    name: 'Eliot',
    nearestAirport: 'JFK',
    destinations: [
      {
        _id: 0,
        airport: 'JFK',
        connects: [ 'BOS', 'ORD' ],
        numConnections: Long('0')
      },
      {
        _id: 1,
        airport: 'BOS',
        connects: [ 'JFK', 'PWM' ],
        numConnections: Long('1')
      },
      {
        _id: 3,
        airport: 'PWM',
        connects: [ 'BOS', 'LHR' ],
        numConnections: Long('2')
      },
      {
        _id: 2,
        airport: 'ORD',
        connects: [ 'JFK' ],
        numConnections: Long('1')
      }
    ]
  },
  {
    _id: 3,
    name: 'Jeff',
    nearestAirport: 'BOS',
    destinations: [
      {
        _id: 0,
        airport: 'JFK',
        connects: [ 'BOS', 'ORD' ],
        numConnections: Long('1')
      },
      {
        _id: 1,
        airport: 'BOS',
        connects: [ 'JFK', 'PWM' ],
        numConnections: Long('0')
      },
      {
        _id: 4,
        airport: 'LHR',
        connects: [ 'PWM' ],
        numConnections: Long('2')
      },
      {
        _id: 3,
        airport: 'PWM',
        connects: [ 'BOS', 'LHR' ],
        numConnections: Long('1')
      },
      {
        _id: 2,
        airport: 'ORD',
        connects: [ 'JFK' ],
        numConnections: Long('2')
      }
    ]
  }
]
