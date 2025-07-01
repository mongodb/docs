curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --header "Content-Type: application/json" \
     --include \
     --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/{GROUP-ID}/clusters?pretty=true" \
     --data '
       {
         "name": "TestGlobalCluster",
         "diskSizeGB": 40,
         "providerSettings": {
           "providerName": "AWS",
           "instanceSizeName": "M30"
         },
         "clusterType": "GEOSHARDED",
         "replicationSpecs": [
           {
             "numShards": 1,
             "regionsConfig": {
               "US_WEST_1": {
                 "analyticsNodes": 0,
                 "electableNodes": 3,
                 "priority": 7,
                 "readOnlyNodes": 0
               }
             },
             "zoneName": "Zone 1"
           },
           {
             "numShards": 1,
             "regionsConfig": {
               "US_EAST_1": {
                 "analyticsNodes": 0,
                 "electableNodes": 3,
                 "priority": 7,
                 "readOnlyNodes": 0
               }
             },
             "zoneName": "Zone 2"
           }
         ],
         "backupEnabled": true
       }'
