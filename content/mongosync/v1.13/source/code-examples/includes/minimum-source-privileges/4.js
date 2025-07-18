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
