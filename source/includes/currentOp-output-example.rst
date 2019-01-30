
.. tabs::

   tabs:
   
      - id: standalone
        name: Standalone
        content: |

            The following is a prototype of the :dbcommand:`currentOp`
            output when run on a standalone:

            .. code-block:: javascript

               {
                 "inprog": [
                      {
                        "host" : <string>,
                        "desc" : <string>,
                        "connectionId" : <number>,
                        "client" : <string>,
                        "appName" : <string>,
                        "clientMetadata" : <document>,
                        "active" : <boolean>,
                        "currentOpTime" : <string>,
                        "opid" : <number>,
                        "secs_running" : <NumberLong()>,
                        "microsecs_running" : <number>,
                        "op" : <string>,
                        "ns" : <string>,
                        "command" : <document>,
                        "originatingCommand" : <document>,
                        "planSummary": <string>,
                        "msg": <string>,
                        "progress" : {
                            "done" : <number>,
                            "total" : <number>
                        },
                        "killPending" : <boolean>,
                        "numYields" : <number>,
                        "locks" : {
                            "Global" : <string>,
                            "MMAPV1Journal" : <string>,
                            "Database" : <string>,
                            "Collection" : <string>,
                            "Metadata" : <string>,
                            "oplog" : <string>
                        },
                        "waitingForLock" : <boolean>,
                        "lockStats" : {
                            "Global": {
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
                            "MMAPV1Journal": {
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
                  "ok": 1
               }

      - id: repl
        name: Replica Set (Primary)
        content: |

            The following is a prototype of the :dbcommand:`currentOp`
            output when run on a primary of a replica set:

            .. code-block:: javascript

               {
                 "inprog": [
                      {
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
                        "opid" : <number>,
                        "secs_running" : <NumberLong()>,
                        "microsecs_running" : <number>,
                        "op" : <string>,
                        "ns" : <string>,
                        "command" : <document>,
                        "originatingCommand" : <document>,
                        "planSummary": <string>,
                        "msg": <string>,
                        "progress" : {
                            "done" : <number>,
                            "total" : <number>
                        },
                        "killPending" : <boolean>,
                        "numYields" : <number>,
                        "locks" : {
                            "Global" : <string>,
                            "MMAPV1Journal" : <string>,
                            "Database" : <string>,
                            "Collection" : <string>,
                            "Metadata" : <string>,
                            "oplog" : <string>
                        },
                        "waitingForLock" : <boolean>,
                        "lockStats" : {
                            "Global": {
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
                            "MMAPV1Journal": {
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

            The following is a prototype of the :dbcommand:`currentOp`
            output when run on a :binary:`~bin.mongos` of a sharded
            cluster:

            .. code-block:: javascript

               {
                  "inprog": [
                       {
                         "shard" : <string>,
                         "host" : <string>,
                         "desc" : <string>,
                         "connectionId" : <number>,
                         "client_s" : <string>,
                         "appName" : <string>,
                         "clientMetadata" : <document>,
                         "active" : <boolean>,
                         "currentOpTime": <string>,
                         "opid" : <string>, // "<shard>:<opid>"
                         "secs_running" : <NumberLong()>,
                         "microsecs_running" : <number>,
                         "op" : <string>,
                         "ns" : <string>,
                         "command" : <document>,
                         "originatingCommand" : <document>,
                         "planSummary": <string>,
                         "msg": <string>,
                         "progress" : {
                             "done" : <number>,
                             "total" : <number>
                         },
                         "killPending" : <boolean>,
                         "numYields" : <number>,
                         "locks" : {
                             "Global" : <string>,
                             "Database" : <string>,
                             "Collection" : <string>,
                             "Metadata" : <string>,
                             "oplog" : <string>
                         },
                         "waitingForLock" : <boolean>,
                         "lockStats" : {
                             "Global": {
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
