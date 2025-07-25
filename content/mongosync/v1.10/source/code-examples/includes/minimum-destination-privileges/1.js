[
   {
      "resource": { "cluster": true },
      "actions": [
         "appendOplogNote",
         "enableSharding",
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
         "bypassDocumentValidation",
         "changeStream",
         "collMod",
         "convertToCapped",
         "createCollection",
         "createIndex",
         "dropCollection",
         "dropIndex",
         "enableSharding",
         "find",
         "indexStats",
         "insert",
         "listCollections",
         "listIndexes",
         "remove",
         "renameCollectionSameDB",
         "update",
         "bypassWriteBlockingMode",
         "setUserWriteBlockMode"
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
      "resource": { "db": "", "collection": "system.views" },
      "actions": [ "dropCollection" ]
   },
   {
      "resource": { "db": "config", "collection": "version" },
      "actions": [ "find" ]
   },
   {
      "resource": { "db": "config", "collection": "collections" },
      "actions": [ "find" ]
   },
   {
      "resource": { "db": "config", "collection": "settings" },
      "actions": [ "find" ]
   },
   {
      "resource": { "db": "config", "collection": "tags" },
      "actions": [ "find" ]
   },
   {
      "resource": { "system_buckets": "" },
      "actions": [ "listCollections", "listIndexes" ]
   }
]
