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
            "opid" : <number>,
            "secs_running" : <NumberLong()>,
            "microsecs_running" : <number>,
            "op" : <string>,
            "ns" : <string>,
            "command" : <document>,
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
      "fsyncLock": <boolean>,
      "info": <string>
   }
