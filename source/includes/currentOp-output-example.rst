.. code-block:: javascript

   {
     "inprog": [
          {
            "desc" : <string>,
            "threadId" : <string>,
            "connectionId" : <number>,
            "client" : <string>,
            "appName" : <string>,
            "opid" : <number>,
            "active" : <boolean>,
            "secs_running" : <NumberLong()>,
            "microsecs_running" : <number>,
            "op" : <string>,
            "ns" : <string>,
            "query" : <document>,
            "insert" : <document>,
            "planSummary": <string>,
            "client" : <string>,
            "appName" : <string>,
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
      "info": <string>
   }
