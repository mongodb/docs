.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 10 30

   * - Sync Type
     - Minimum Source Privileges

   * - Default
     - .. code-block:: javascript

          [
             {
                 "resource": { "cluster": true },
                 "actions": [
                    "appendOplogNote",
                    "getDefaultRWConcern",
                    "getShardMap",
                    "hostInfo",
                    "listDatabases",
                    "listShards",
                    "replSetGetConfig",
                    "replSetGetStatus",
                    "serverStatus"
                 ]
             },
             {
                 "resource": { "db": "", "collection": "" },
                 "actions": [
                    "changeStream",
                    "collStats",
                    "find",
                    "indexStats",
                    "listCollections",
                    "listIndexes"
               ]
             },
             {
                 "resource": { "db": "admin", "collection": "system.version" },
                 "actions": [ "find" ]
             },
             {
                 "resource": { "db": "", "collection": "system.js" },
                 "actions": [ "listCollections", "listIndexes" ]
             },
             {
                 "resource": { "db": "config", "collection": "shards" },
                 "actions": [ "find" ]
             },
             {
                 "resource": { "db": "config", "collection": "collections" },
                 "actions": [ "find" ]
             },
             {
                 "resource": { "db": "config", "collection": "version" },
                 "actions": [ "find" ]
             },
             {
                 "resource": { "db": "config", "collection": "settings" },
                 "actions": [ "find" ]
             },
             {
                 "resource": { "system_buckets": "" },
                 "actions": [ "listCollections", "listIndexes" ]
             }
          ]

   * - Write-blocking
     - Everything from the default source privileges with the addition of:
       
       .. code-block:: javascript

          [
            {
                "resource": { "cluster": true },
                "actions": [ "bypassWriteBlockingMode", "setUserWriteBlockMode" ]
            }
          ]

   * - Reversing
     - Everything from the default source privileges and the default destination
       privileges. 

   * - Multiple Reversals
     - Everything from the default source privileges and the default destination
       privileges with the addition of:

       .. code-block:: javascript

          [
              { "resource": { "db": "", "collection": "" }, "actions": [ "dropDatabase" ] }
          ]

   * - V4.4 Migration
     - .. code-block:: javascript
  
          [
             {
                "resource": { "cluster": true },
                "actions": [
                   "addShard",
                   "appendOplogNote",
                   "flushRouterConfig",
                   "getDefaultRWConcern",
                   "getShardMap",
                   "hostInfo",
                   "listDatabases",
                   "listShards",
                   "replSetGetConfig",
                   "replSetGetStatus",
                   "serverStatus"
               ]
             },
             {
                "resource": { "db": "", "collection": "" },
                "actions": [
                   "changeStream",
                   "collStats",
                   "find",
                   "indexStats",
                   "listCollections",
                   "listIndexes"
               ]
             },
             {
                "resource": { "db": "admin", "collection": "system.version" },
                "actions": [ "find" ]
             },
             {
                "resource": { "db": "", "collection": "system.js" },
                "actions": [ "listCollections", "listIndexes" ]
             },
             {
                "resource": { "db": "config", "collection": "shards" },
                "actions": [ "find" ]
             },
             {
                "resource": { "db": "config", "collection": "collections" },
                "actions": [ "find" ]
             },
             {
                "resource": { "db": "config", "collection": "version" },
                "actions": [ "find" ]
             },
             {
                "resource": { "db": "config", "collection": "settings" },
                "actions": [ "find" ]
             }
          ]


