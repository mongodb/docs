[
  {
    id: '6a22ddd3709bac3ce7a37252',
    name: 'movie-index',
    status: 'READY',
    queryable: true,
    latestDefinitionVersion: {
      version: 0,
      createdAt: ISODate('2026-06-05T14:31:47.000Z')
    },
    latestDefinition: {
      mappings: {
        dynamic: true
      }
    },
    statusDetail: [ {
      hostname: '6a22dbdcb2393a40012a14b2',
      status: 'READY',
      queryable: true,
      mainIndex: {
        status: 'READY',
        queryable: true,
        definitionVersion: {
          version: 0,
          createdAt: ISODate('2026-06-05T14:31:47.000Z')
        },
        definition: {
          mappings: {
            dynamic: true,
           fields: {}
          }
        }
      }
    } ],
    numDocs: 21349
  },
  {
    id: '6a22dde9709bac3ce7a37254',
    name: 'movie-vector-index',
    status: 'READY',
    queryable: true,
    latestDefinitionVersion: {
      version: 0,
      createdAt: ISODate('2026-06-05T14:32:09.000Z')
    },
    latestDefinition: {
    fields: [
      {
        type: 'vector',
        path: 'plot_embedding_voyage_4_large',
        numDimensions: 2048,
        similarity: 'dotProduct'
      }
    ]
  },
  statusDetail: [
    {
      hostname: '6a22dbdcb2393a40012a14b2',
      status: 'READY',
      queryable: true,
      mainIndex: {
        status: 'READY',
        queryable: true,
        definitionVersion: {
          version: 0,
          createdAt: ISODate('2026-06-05T14:32:09.000Z')
        },
        definition: {
          fields: [
            {
              type: 'vector',
              path: 'plot_embedding_voyage_4_large',
              numDimensions: 2048,
                similarity: 'dotProduct'
              }
            ]
          }
        }
      }
    ],
    numDocs: 21349
  }
]