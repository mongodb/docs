curl localhost:27182/api/v1/start -XPOST \
--data '
   {
      "source": "cluster0",
      "destination": "cluster1",
      "sharding": {
         "createSupportingIndexes": true,
         "shardingEntries": [
            {
                "database": "accounts",
                "collection": "us_east",
                "shardCollection": {
                   "key": [
                      { "location": 1 },
                      { "region": 1 }
                   ]
                }
            }
         ]
      }
   } '
