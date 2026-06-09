{
  explainVersion: '1',
  stages: [
    {
      '$_internalSearchMongotRemote': {
        mongotQuery: {
          text: { path: 'title', query: 'prince' },
          highlight: { path: 'title', maxNumPassages: 1, maxCharsToExamine: 40 }
        },
        explain: {
          query: {
            type: 'TermQuery',
            args: { path: 'title', value: 'prince' }
          },
          highlight: { resolvedHighlightPaths: [ '$type:string/title' ] },
          metadata: {
            <hostname>.mongodb.netmongotVersion: '1.42.0',
            mongotHostName: '<hostname>.mongodb.net',
            indexName: 'default',
            totalLuceneDocs: 21349
          }
        },
        requiresSearchMetaCursor: false
      }
    },
    {
      '$_internalSearchIdLookup': {
        subPipeline: [
          { '$match': { _id: { '$eq': '_id placeholder' } } }
        ]
      }
    },
    {
      '$project': {
        description: true,
        highlights: { '$meta': 'searchHighlights' },
        _id: false
      }
    }
  ],
  queryShapeHash: 'D08444272924C1E04A6E99D0CD4BF82FD929893862B3356F79EC18BBD1F0EF0C',
  serverInfo: {
    host: '<hostname>.mongodb.net',
    port: 27017,
    version: '8.2.0',
    gitVersion: '13e629eeccd63f00d17568fc4c12b7530fa34b54'
  },
  serverParameters: {
    ...
  },
  command: {
    aggregate: 'movies',
    pipeline: [
      {
        '$search': {
          text: { path: 'title', query: 'prince' },
          highlight: { path: 'title', maxNumPassages: 1, maxCharsToExamine: 40 }
        }
      },
      {
        '$project': {
          description: 1,
          _id: 0,
          highlights: { '$meta': 'searchHighlights' }
        }
      }
    ],
    cursor: {},
    '$db': 'sample_mflix'
  },
  ok: 1,
  '$clusterTime': {
    clusterTime: Timestamp({ t: 1758305809, i: 1 }),
    signature: {
      hash: Binary.createFromBase64('R7wN4/xS0eg0XFd23xeo/+hMPBY=', 0),
      keyId: Long('7551379485140975621')
    }
  },
  operationTime: Timestamp({ t: 1758305809, i: 1 })
}