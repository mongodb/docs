.. tabs::

   tabs:
   
      - id: standalone
        name: Standalone
        content: |

            The following is a prototype of the :dbcommand:`currentOp`
            output when run on a standalone:

            .. versionchanged:: 4.2

            .. code-block:: javascript

                {
                  "inprog": [
                       {
                         "type" : <string>,
                         "host" : <string>,
                         "desc" : <string>,
                         "connectionId" : <number>,
                         "client" : <string>,
                         "appName" : <string>,
                         "clientMetadata" : <document>,
                         "active" : <boolean>,
                         "currentOpTime" : <string>,
                         "effectiveUsers" : [
                            {
                               "user" : <string>,
                               "db" : <string>
                            }
                         ],
                         "opid" : <number>,
                         "lsid" : {
                            "id" : <UUID>,
                            "uid" : <BinData>
                         },
                         "secs_running" : <NumberLong()>,
                         "microsecs_running" : <number>,
                         "op" : <string>,
                         "ns" : <string>,
                         "command" : <document>,
                         "queryFramework" : <string>,
                         "planSummary": <string>,
                         "cursor" : {                              // only for getMore operations
                            "cursorId" : <NumberLong()>,
                            "createdDate" : <ISODate()>,
                            "lastAccessDate" : <ISODate()>,
                            "nDocsReturned" : <NumberLong()>,
                            "nBatchesReturned" : <NumberLong()>,
                            "noCursorTimeout" : <boolean>,
                            "tailable" : <boolean>,
                            "awaitData" : <boolean>,
                            "originatingCommand" : <document>,
                            "planSummary" : <string>,
                            "operationUsingCursorId" : <NumberLong()>
                         },
                         "msg": <string>,
                         "progress" : {
                             "done" : <number>,
                             "total" : <number>
                         },
                         "killPending" : <boolean>,
                         "numYields" : <number>,
                         "dataThroughputLastSecond" : <number>, 
                         "dataThroughputAverage" : <number>, 
                         "locks" : {
                             "ParallelBatchWriterMode" : <string>,
                             "ReplicationStateTransition" : <string>,
                             "Global" : <string>,
                             "Database" : <string>,
                             "Collection" : <string>,
                             "Metadata" : <string>,
                             "oplog" : <string>
                         },
                         "waitingForLock" : <boolean>,
                         "lockStats" : {
                             "ParallelBatchWriterMode" : {
                                "acquireCount": {
                                   "r": <NumberLong>,
                                   "w": <NumberLong>,
                                   "R": <NumberLong>,
                                   "W": <NumberLong>
                                },
                                "acquireWaitCount": {
                                   "r": <NumberLong>,
                                   "w": <NumberLong>,
                                   "R": <NumberLong>,
                                   "W": <NumberLong>
                                },
                                "timeAcquiringMicros" : {
                                   "r" : NumberLong(0),
                                   "w" : NumberLong(0),
                                   "R" : NumberLong(0),
                                   "W" : NumberLong(0)
                                },
                                "deadlockCount" : {
                                   "r" : NumberLong(0),
                                   "w" : NumberLong(0),
                                   "R" : NumberLong(0),
                                   "W" : NumberLong(0)
                                }
                             },
                             "ReplicationStateTransition" : {
                                ...
                             },
                             "Global": {
                                ...
                             },
                             "Database" : {
                                ...
                             },
                             ...
                         }
                       },
                       ...
                   ],
                   "fsyncLock": <boolean>,
                   "info": <string>,
                    "ok": <num>
                }
      - id: repl
        name: Replica Set (Primary)
        content: |

            The following is a prototype of the :dbcommand:`currentOp`
            output when run on a primary of a replica set:

            .. versionchanged:: 4.2

            .. code-block:: javascript

               {
                 "inprog": [
                      {
                        "type" : <string>,
                        "host" : <string>,
                        "desc" : <string>,
                        "connectionId" : <number>,
                        "client" : <string>,
                        "appName" : <string>,
                        "clientMetadata" : <document>,
                        "lsid" : {
                           "id" : <UUID>,
                           "uid" : <BinData>
                        },
                        "transaction" : {
                           "parameters" : {
                              "txnNumber" : <NumberLong()>,
                              "autocommit" : <boolean>,
                              "readConcern" : {
                                 "level" : <string>
                              }
                           },
                           "readTimestamp" : <Timestamp>,
                           "startWallClockTime" : <string>,
                           "timeOpenMicros" : <NumberLong()>,
                           "timeActiveMicros" : <NumberLong()>,
                           "timeInactiveMicros" : <NumberLong()>,
                           "expiryTime" : <string>,
                        },
                        "active" : <boolean>,
                        "currentOpTime" : <string>,
                        "effectiveUsers" : [
                           {
                              "user" : <string>,
                              "db" : <string>
                           }
                        ],
                        "opid" : <number>,
                        "secs_running" : <NumberLong()>,
                        "microsecs_running" : <number>,
                        "op" : <string>,
                        "ns" : <string>,
                        "command" : <document>,
                        "originatingCommand" : <document>,
                        "queryFramework" : <string>,
                        "planSummary": <string>,
                        "prepareReadConflicts" : <NumberLong()>,
                        "writeConflicts" : <NumberLong()>,
                        "cursor" : {                              // only for getMore operations
                           "cursorId" : <NumberLong()>,
                           "createdDate" : <ISODate()>,
                           "lastAccessDate" : <ISODate()>,
                           "nDocsReturned" : <NumberLong()>,
                           "nBatchesReturned" : <NumberLong()>,
                           "noCursorTimeout" : <boolean>,
                           "tailable" : <boolean>,
                           "awaitData" : <boolean>,
                           "originatingCommand" : <document>,
                           "planSummary" : <string>,
                           "operationUsingCursorId" : <NumberLong()>
                        },
                        "msg": <string>,
                        "progress" : {
                            "done" : <number>,
                            "total" : <number>
                        },
                        "killPending" : <boolean>,
                        "numYields" : <number>,
                        "dataThroughputLastSecond" : <number>, 
                        "dataThroughputAverage" : <number>, 
                        "locks" : {
                            "ParallelBatchWriterMode" : <string>,
                            "ReplicationStateTransition" : <string>,
                            "Global" : <string>,
                            "Database" : <string>,
                            "Collection" : <string>,
                            "Metadata" : <string>,
                            "oplog" : <string>
                        },
                        "waitingForLock" : <boolean>,
                        "lockStats" : {
                            "ParallelBatchWriterMode" : {
                               "acquireCount": {
                                  "r": <NumberLong>,
                                  "w": <NumberLong>,
                                  "R": <NumberLong>,
                                  "W": <NumberLong>
                               },
                               "acquireWaitCount": {
                                  "r": <NumberLong>,
                                  "w": <NumberLong>,
                                  "R": <NumberLong>,
                                  "W": <NumberLong>
                               },
                               "timeAcquiringMicros" : {
                                  "r" : NumberLong(0),
                                  "w" : NumberLong(0),
                                  "R" : NumberLong(0),
                                  "W" : NumberLong(0)
                               },
                               "deadlockCount" : {
                                  "r" : NumberLong(0),
                                  "w" : NumberLong(0),
                                  "R" : NumberLong(0),
                                  "W" : NumberLong(0)
                               }
                            },
                            "ReplicationStateTransition" : { 
                               ...
                            },
                            "Global" : {
                               ...
                            },
                            "Database" : {
                               ...
                            },
                            ...
                        }
                      },
                      ...
                  ],
                  "fsyncLock": <boolean>,
                  "info": <string>,
                  "ok": <num>,
                  "operationTime": <timestamp>,
                  "$clusterTime": <document>
               }

      - id: shardedcluster
        name: Sharded Cluster (mongos)
        content: |

            The following is an example of the :dbcommand:`currentOp`
            output when run on a :binary:`~bin.mongos` of a sharded
            cluster (Fields may vary depending on the operation being
            reported):

            .. versionchanged:: 4.2

            .. code-block:: javascript

                {
                  "inprog": [
                       {
                         "shard": <string>,
                         "type" : <string>,
                         "host" : <string>,
                         "desc" : <string>,
                         "connectionId" : <number>,
                         "client_s" : <string>,
                         "appName" : <string>,
                         "clientMetadata" : <document>,
                         "lsid" : {
                            "id" : <UUID>,
                            "uid" : <BinData>
                         },
                         "transaction" : {
                            "parameters" : {
                               "txnNumber" : <NumberLong()>,
                               "autocommit" : <boolean>,
                               "readConcern" : {
                                  "level" : <string>
                               }
                            },
                            "readTimestamp" : <Timestamp>,
                            "startWallClockTime" : <string>,
                            "timeOpenMicros" : <NumberLong()>,
                            "timeActiveMicros" : <NumberLong()>,
                            "timeInactiveMicros" : <NumberLong()>,
                            "expiryTime" : <string>,
                         },
                         "active" : <boolean>,
                         "currentOpTime" : <string>,
                         "effectiveUsers" : [
                            {
                               "user" : <string>,
                               "db" : <string>
                            }
                         ],
                         "runBy" : [
                            {
                               "user" : <string>,
                               "db" : <string>
                            }
                         ],
                         "twoPhaseCommitCoordinator" : {           // Starting in 4.2.1
                            "lsid" : {
                               "id" : <UUID>,
                               "uid" : <BinData>
                            },
                            "txnNumber" : <NumberLong>,
                            "numParticipants" : <NumberLong>,
                            "state" : <string>,
                            "commitStartTime" : <ISODate>,
                            "hasRecoveredFromFailover" : <boolean>,
                            "stepDurations" : <document>,
                            "decision" : <document>,
                            "deadline" : <ISODate>
                         }
                         "opid" : <string>,
                         "secs_running" : <NumberLong()>,
                         "microsecs_running" : <number>,
                         "op" : <string>,
                         "ns" : <string>,
                         "command" : <document>,
                         "configTime" : <Timestamp>,           // Starting in 5.0
                         "topologyTime" : <Timestamp>,           // Starting in 5.0
                         "queryFramework" : <string>,            // Starting in 6.2       
                         "planSummary": <string>,
                         "prepareReadConflicts" : <NumberLong()>,
                         "writeConflicts" : <NumberLong()>,
                         "cursor" : {                              // only for getMore operations
                            "cursorId" : <NumberLong()>,
                            "createdDate" : <ISODate()>,
                            "lastAccessDate" : <ISODate()>,
                            "nDocsReturned" : <NumberLong()>,
                            "nBatchesReturned" : <NumberLong()>,
                            "noCursorTimeout" : <boolean>,
                            "tailable" : <boolean>,
                            "awaitData" : <boolean>,
                            "originatingCommand" : <document>,
                            "planSummary" : <string>,
                            "operationUsingCursorId" : <NumberLong()>
                         },
                         "msg": <string>,
                         "progress" : {
                             "done" : <number>,
                             "total" : <number>
                         },
                         "killPending" : <boolean>,
                         "numYields" : <number>,
                         "dataThroughputLastSecond" : <number>, 
                         "dataThroughputAverage" : <number>, 
                         "locks" : {
                             "ParallelBatchWriterMode" : <string>,
                             "ReplicationStateTransition" : <string>,
                             "Global" : <string>,
                             "Database" : <string>,
                             "Collection" : <string>,
                             "Metadata" : <string>,
                             "DDLDatabase" : <string>,
                             "DDLCollection" : <string>, 
                             "oplog" : <string>
                         },
                         "waitingForLock" : <boolean>,
                         "lockStats" : {
                             "ParallelBatchWriterMode": {
                                "acquireCount": {
                                   "r": <NumberLong>,
                                   "w": <NumberLong>,
                                   "R": <NumberLong>,
                                   "W": <NumberLong>
                                },
                                "acquireWaitCount": {
                                   "r": <NumberLong>,
                                   "w": <NumberLong>,
                                   "R": <NumberLong>,
                                   "W": <NumberLong>
                                },
                                "timeAcquiringMicros" : {
                                   "r" : NumberLong(0),
                                   "w" : NumberLong(0),
                                   "R" : NumberLong(0),
                                   "W" : NumberLong(0)
                                },
                                "deadlockCount" : {
                                   "r" : NumberLong(0),
                                   "w" : NumberLong(0),
                                   "R" : NumberLong(0),
                                   "W" : NumberLong(0)
                                }
                             },
                             "ReplicationStateTransition" : {
                                ...
                             },
                             "Global" : {
                                ...
                             },
                             "Database" : {
                                ...
                             },
                             ...
                         }
                       },
                       ...
                   ],
                  "ok": <num>,
                  "operationTime": <timestamp>,
                  "$clusterTime": <document>
                }
