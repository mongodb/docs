//All code examples for JS Aggregation Operators

function addFields() {
  //start addFields
  const pipeline = [
    {
      $addFields: {
        totalReviews: {
          $add: ["$imdb.votes", "$tomatoes.viewer.numReviews"]
        }
      }
    }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end addFields
}

function bucket() {
  //start bucket
  const pipeline = [
    {
      $bucket: {
        groupBy: "$runtime",
        boundaries: [0, 17, 91, 121, 151, 201, 999],
        default: "other"
      }
    }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end bucket
}

function bucketAuto() {
  //start bucketAuto
  const pipeline = [
    {
      $bucketAuto: {
        groupBy: "$runtime",
        buckets: 5
      }
    }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end bucketAuto
}

function bucketAutoOptions() {
  //start bucketAutoOptions
  const pipeline = [
    {
      $bucketAuto: {
        groupBy: "$runtime",
        buckets: 5,
        granularity: "POWERSOF2"
      }
    }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end bucketAutoOptions
}

function changeStream() {
  //start changeStream
  const pipeline = [{ $changeStream: {} }];

  const changeStream = collection.watch(pipeline);
  return changeStream;
  //end changeStream
}

function changeStreamOptions() {
  //start changeStreamOptions
  const pipeline = [
    {
      $changeStream: {
        fullDocument: 'updateLookup',
        startAtOperationTime: 3000
      }
    }
  ];

  const changeStream = collection.watch(pipeline);
  return changeStream;
  //end changeStreamOptions
}

function changeStreamSplitLargeEvent() {
  //start changeStreamSplitLargeEvent
  const pipeline = [{ changeStreamSplitLargeEvent: {} }];

  const changeStream = collection.watch(pipeline);
  return changeStream;
  //end changeStreamSplitLargeEvent

}

function collStatsLat(){
  //start CSLatency 
  const pipeline = [
    {
      $collStats: {
        latencyStats: {histograms: true}
      }
    }
  ];

  const cursor = collection.aggregate(pipeline);  
  return cursor;
  //end CSLatency
}

function collStatsStorage() {
  //start CSStorage
  const pipeline = [{ $collStats: { storageStats: {} } }]; 

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end CSStorage
}

function collStatsTS(){      
  //start CSTimeSeries
  const pipeline = [{ $collStats: { storageStats: {} } }];

  const cursor = collection.aggregate(pipeline);
  const timeSeriesStats = resultsTimeSeries[0].storageStats.timeseries;  

  return timeSeriesStats;
  //end CSTimeSeries
}

function collStatsC() {
  //start CSCount
  const pipeline = [{ $collStats: { count: {} } }]; 

  const cursor =  collection.aggregate(pipeline);
  return cursor;
  //end CSCount
}

function collStatsQueryExecStats() {
  //start queryExecStats
  const pipeline = [{ $collStats: { queryExecStats: {} } }]; 

  const cursor =  collection.aggregate(pipeline);
  return cursor;
  //end queryExecStats
}

function count() {
  //start count
  const pipeline = [{ $count: "movies" }];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end count
}

function currentOp() {
  //start currentOp
  const db = client.db("admin");

  const pipeline = [
    {
      $currentOp: {
        allUsers: true,
        idleSessions: true
      }
    },
    {
      $match: {
        active: false,
        transaction: { $exists: true }
      }
    }
  ];

  const cursor = db.aggregate(pipeline);
  return cursor;
  //end currentOp
}

function currentOp() {
  //start currentOpFilter
  const db = client.db("admin");

  const pipeline = [
    {
      $currentOp: {
        allUsers: true,
        idleSessions: true
      }
    },
    { $match: { type: "idleSession" } }
  ];

  const cursor = db.aggregate(pipeline);
  return cursor;
  //end currentOpFilter
}

function currentOpQuery() {
  //start currentOpQuery
  const db = client.db("admin");

  const pipeline = [
    {
      $currentOp: {
        allUsers: true,
        localOps: true
      }
    },
    { $match: { desc: "query analyzer" } }
  ];

  const cursor = db.aggregate(pipeline);
  return cursor;
  //end currentOpQuery
}

function densify() {
  //start densify
  const pipeline = [
    {
      $densify: {
        field: "ts",
        partitionByFields: ["position.coordinates"],
        range: {
          step: 15,
          unit: "minute",
          bounds: [new Date(1984, 3, 5, 8, 0, 0), new Date(1984, 3, 5, 9, 0, 0)]
        }
      }
    }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end densify
}

function documents() {
  //start documents
  const pipeline = [
    {
      $documents: [
        { "title": "The Shawshank Redemption" },
        { "title": "Back to the Future" },
        { "title": "Jurassic Park" }
      ]
    }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end documents
}

function facet() {
  //start facet
  const pipeline = [
    {
      $facet: {
        bucketPipeline: [
          {
            $bucketAuto: {
              groupBy: "$runtime",
              buckets: 5
            }
          }
        ],
        countLimit: [
          { $sortByCount: "$rated" },
          { $limit: 5 }
        ]
      }
    }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end facet
}

function fill() {
  //start fill
  const pipeline = [
    {
      $group: {
        _id: "$ts",
        seaSurfaceTemperature: { $avg: "$seaSurfaceTemperature.value" },
      }
    },
    {
      $fill: {
        sortBy: { _id: 1 },  
        output: { seaSurfaceTemperature: { method: "linear" } }
      }
    }
  ]; 

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end fill 
}

function geoNearMax() {
  //start geoNear
  const pipeline = [
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [-74.1, 40.95]
        },
        distanceField: "distance",
        maxDistance: 8000,
        query: { "location.address.state": "NJ" },
        spherical: true
      }
    }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end geoNear
}

function geoNearMin() {
  //start geoNear min
  const pipeline = [
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [-74.1, 40.95]
        },
        distanceField: "distance",
        minDistance: 8000,
        query: { "location.address.state": "NJ" },
        spherical: true
      },
    },
    { $limit: 4 }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end geoNear min
}

function graphLookup() {
  //start graphLookup
  const pipeline = [
    {
      $graphLookup: {
        from: "employees",
        connectFromField: "reportsTo",
        connectToField: "name",
        startWith: "$reportsTo",
        as: "reportingHierarchy"
      }
    }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end graphLookup
}

function graphLookupMaxDepth() {
  //start graphLookup maxDepth
  const pipeline = [
    {
      $graphLookup: {
        from: "employees",
        connectFromField: "reportsTo",
        connectToField: "name",
        startWith: "$reportsTo",
        as: "reportingHierarchy",
        maxDepth: 1
      }
    }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end graphLookup maxDepth
}

function graphLookupRestricted() {
  //start graphLookup restricted
  const pipeline = [
    {
      $graphLookup: {
        from: "employees",
        connectFromField: "reportsTo",
        connectToField: "name",
        startWith: "$reportsTo",
        as: "reportingHierarchy",
        maxDepth: 1,
        restrictSearchWithMatch: { hobbies: "golf" }
      }
    }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end graphLookup restricted
}

function group() {
  //start group
  const pipeline = [
    {
      $group: {
        _id: "$rated",
        rating: { $first: "$rated" },
        totalRuntime: { $sum: "$runtime" }
      }
    }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end group
}

function indexStats() {
  //start indexStats
  const pipeline = [{ $indexStats: {} }];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end indexStats
}

function limit() {
  //start limit
  const pipeline = [{ $limit: 10 }];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end limit
}

function listClusterCatalog(){
  //start listClusterCatalog
  const pipeline = [{ $listClusterCatalog: {} }];

  const db = client.db("sample_mflix");

  const cursor = db.aggregate(pipeline);
  return cursor;
  //end listClusterCatalog
}

function listClusterCatalogAdmin(){
  //start listClusterCatalogAdmin
  const pipeline = [{ $listClusterCatalog: {} }];

  const adminDB = client.db("admin");

  const cursor = adminDB.aggregate(pipeline);
  return cursor;
  //end listClusterCatalogAdmin
}

function listCCColl(){
  //start listSpecCC
  const db = client.db("sample_mflix");

  const pipeline = [{ $listClusterCatalog: {balancingConfiguration: true} }];

  const cursor = db.aggregate(pipeline);
  return cursor;
  //end listSpecCC
}

function listLocalSessionsAll() {
  //start listLocalSessionsAll
  const pipeline = [{ $listLocalSessions: { allUsers: true } }];

  const cursor = db.aggregate(pipeline);
  return cursor;
  //end listLocalSessionsAll
}

function listLocalSessionsSpec() {
  //start listLocalSessionsSpec
  const pipeline = [
    { 
      $listLocalSessions: { 
        users: [{ user: "myAppReader", db: "test"}] 
      } 
    }
  ];

  const cursor = db.aggregate(pipeline);
  return cursor;
  //end listLocalSessionsSpec
}

function listLocalSessionsCurrent() {
  //start listLocalSessionsCurrent
  const pipeline = [{ $listLocalSessions: {} }];

  const cursor = db.aggregate(pipeline);
  return cursor;
  //end listLocalSessionsCurrent
}

function listSampledQueries() {
  //start listSampledQueries
  const pipeline = [{ $listSampledQueries: {} }];

  const cursor = db.aggregate(pipeline);
  return cursor;
  //end listSampledQueries
}

function listSampledQueriesWithNamespace() {
  //start listSampledQueriesWithNamespace
  const pipeline = [{ $listSampledQueries: { namespace: "sample_mflix.movies" } }];

  const cursor = db.aggregate(pipeline);
  return cursor;
  //end listSampledQueriesWithNamespace
}

function listSearchIndexes() {
  //start listSearchIndexes
  const pipeline = [{ $listSearchIndexes: {} }];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end listSearchIndexes
}

function listSearchIndexesName() {
  //start listSearchIndexesName
  const pipeline = [{ $listSearchIndexes: { name: "synonym-mappings" } }];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end listSearchIndexesName
}

function listSearchIndexesID() {
  //start listSearchIndexesID
  const pipeline = [{ $listSearchIndexes: { id: "6524096020da840844a4c4a7" } }];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end listSearchIndexesID
}

function listSessionsAll() {
  //start listSessionsAll
  const db = client.db("config");
  const collection = db.collection("system.sessions");

  const pipeline = [{ $listSessions: { allUsers: true } }];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end listSessionsAll
}

function listSessionsSpec() {
  //start listSessionsSpec
  const db = client.db("config");
  const collection = db.collection("system.sessions");

  const pipeline = [
    { 
      $listSessions: { 
        users: [{ user: "myAppReader", db: "test"}] 
      } 
    }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end listSessionsSpec
}

function listSessionsCurrent() {
  //start listSessionsCurrent
  const db = client.db("config");
  const collection = db.collection("system.sessions");

  const pipeline = [{ $listSessions: {} }];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end listSessionsCurrent
}

function lookup() {
  //start lookup
  const pipeline = [
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "movie_id",
        as: "comments"
      }
    }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end lookup
}

function match() {
  //start match
  const pipeline = [
    {
      $match: {
        title: "The Shawshank Redemption"
      }
    }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end match 
}

function merge() {
  //start merge
  const pipeline = [
    {
      $merge: {
        into: "movies",
        on: ["_id", "title"],
        whenMatched: "replace",
        whenNotMatched: "insert"
      }
    }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end merge
}

function out() {
  //start out
  const pipeline = [{ $out: { db: "sample_mflix", coll: "movies" } }];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end out
}

function planCacheStats() {
  //start planCacheStats
  const pipeline = [{ $planCacheStats: {} }];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end planCacheStats
}

function planCacheStatsQueryKey() {
  //start planCacheStatsQueryKey
  const pipeline = [
 { $planCacheStats: {} },
    { $match: { planCacheKey: "B1435201"} }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end planCacheStatsQueryKey
}

function querySettings() {
  //start indexes
  const year = collection.createIndex({ year: 1 });  
  const title = collection.createIndex({ title: 1 });  
  //end indexes

  //start settings
  const command = {
    setQuerySettings: {
      find: "movies",
      filter: { year: { $gt: 2011 } },
      sort: { title: 1 },
      $db: "sample_mflix"
    },
    settings: {
      indexHints: {
        ns: { db: "sample_mflix", coll: "movies" },
        allowedIndexes: [ "year_1" ]
      },
      queryFramework: "classic",
      comment: "Index hint for year_1 index to improve query performance"
    }
  };

  const adminDb = client.db("admin");
  const result = adminDb.command(command);
  //end settings

  //start querySettings
  const pipeline = [ { $querySettings: {showDebugQueryShape: true} } ];

  const cursor = adminDb.aggregate(pipeline);
  return cursor;
  //end querySettings
}

function queryStats() {
  //start queryStats
  const pipeline = [{ $queryStats: {} }];

  const adminDb = client.db("admin");
  const cursor = adminDb.aggregate(pipeline);
  return cursor;
  //end queryStats
}

function queryStatsTransformed() {
  //start queryStatsTransformed
  const pipeline = [
    { 
      $queryStats: {
        transformIdentifiers: {
          algorithm: "hmac-sha-256",
          hmacKey: new Binary(Buffer.from("87c4082f169d3fef0eef34dc8e23458cbb457c3aabbccddeeff00112233445566778899", "hex"), 8)
        }
      }
    }
  ];

  const adminDb = client.db("admin");
  const cursor = adminDb.aggregate(pipeline);
  return cursor;
  //end queryStatsTransformed
}

function rankFusion(){
  //start rf index
  const index = {
    name: "default",
    definition: {
      mappings: { dynamic: true }
    }
  }

  const result = collection.createSearchIndex(index);
  //end rf index
  
  //start rankFusion
  const pipeline = [
    {
      $rankFusion: { 
        input: {
          pipelines: {
            searchPlot: [
              {
                $search: {
                  index: "default",
                  text: { query: "space", path: "plot"}
                }
              }
            ],
            searchGenre: [
              {
                $search: {
                  index: "default",
                  text: { query: "adventure", path: "genres" }
                }
              }
            ] 
          }
        },
        combination: { weights: {searchPlot: 0.6, searchGenre: 0.4} },
        scoreDetails: true                  
      }
    },
    { $addFields: { scoreDetails: { $meta: "searchScoreDetails" } } }
  ];
            
  const cursor = collection.aggregate(pipeline);  
  return cursor;
  //end rankFusion
}

function redact() {
  //start redact
  const pipeline = [
    { 
      $redact: {
        $cond: {  
          if: { $gte: ["$imdb.rating", 9] }, 
          then: "$$KEEP", 
          else: "$$PRUNE"  
        }
      }
    }
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end redact
}

function replaceRoot() {
  //start replaceRoot
  const pipeline = [{ $replaceRoot: { newRoot: "$imdb" } }];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end replaceRoot
}

function replaceWith() {
  //start replaceWith
  const pipeline = [{ $replaceWith: { replacement: "$imdb" } }];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end replaceWith
}

function sample() {
  //start sample
  const pipeline = [{ $sample: { size: 5 } }];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end sample
}

function set() {
  //start set
  const pipeline = [{ $set: { lastupdated: new Date() } }];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end set
}

function setWindowFields() {
  //start setWindowFields
  const pipeline = [
    {
      $setWindowFields: {
        partitionBy: "$callLetters",
        sortBy: { ts: 1 },
        output: {
          temperatureAvg: {
            $avg: "$airTemperature.value",
            window: {
              range: [-1, "current"],
              unit: "month"
            }
          },
          totalWaveHeight: {
            $sum: "$waveMeasurement.waves.height",
            window: {
              range: [-1, "current"],
              unit: "month"
            }
          }
        }
      }
    },
  ];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end setWindowFields
}

function shardedDataDistribution() {
  //start shardedDataDistribution
  const pipeline = [{$shardedDataDistribution: {} }];

  const adminDb = client.db("admin");
  const cursor = adminDb.aggregate(pipeline);
  return cursor;
  //end shardedDataDistribution
}

function sDName(){
  //start sDName
  const pipeline = [
    { $shardedDataDistribution: {} },
    { $match: {"shards.shardName": 'atlas-kn29y8-shard-0'} }
  ];

  const adminDb = client.db("admin");
  const cursor = adminDb.aggregate(pipeline);
  return cursor;
  //end sDName
}

function sDNamespace() {
  //start sDNamespace
  const pipeline = [
    { $shardedDataDistribution: {} },
    { $match: {"ns": "sample_mflix.movies"} }
  ];

  const adminDb = client.db("admin");
  const cursor = adminDb.aggregate(pipeline);
  return cursor;
  //end sDNamespace
}

function skip() {
  //start skip
  const pipeline = [{ $skip: 5 }];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end skip
}

function sort() {
  //start sort
  const pipeline = [{ $sort: { year: -1, title: 1 } }];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end sort
}

function sortByCount() {
  //start sortByCount
  const pipeline = [{ $sortByCount: "$rated" }];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end sortByCount
}

function unionWith() {
  //start unionWith
  const db = client.db("sample_mflix");
  const collection = db.collection("movies");

  const pipeline = [{ $unionWith: { coll: "Movies" } }];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end unionWith
}

function unset() {
  //start unset
  const pipeline = [{ $unset: ["imdb.votes", "tomatoes"] }];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end unset
}

function unwind() {
  //start unwind
  const pipeline = [{ $unwind: "$genres" }];

  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end unwind
}

function unwindPreserve() {
  //start unwindPreserve
  const pipeline = [
    {
      $unwind: {
        path: "$genres",
        preserveNullAndEmptyArrays: true,
        includeArrayIndex: "index"
      }
    }
  ];
  
  const cursor = collection.aggregate(pipeline);
  return cursor;
  //end unwindPreserve
}
