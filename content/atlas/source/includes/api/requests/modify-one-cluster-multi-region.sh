curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --header "Content-Type: application/json" \
     --include \
     --request PATCH "https://cloud.mongodb.com/api/atlas/v1.0/groups/5fac2d0cd2124a40ce0cfc5c/clusters/MultiRegionCluster?pretty=true" \
     --data '
       {
         "diskSizeGB": 100,
         "clusterType": "REPLICASET",
         "providerSettings": {
           "providerName": "AWS",
           "instanceSizeName": "M30"
         },
         "replicationSpecs": [
           {
             "id": "5fac2d0cd2124a40ce0cfc5c",
             "numShards": 1,
             "regionsConfig": {
               "US_EAST_1": {
                 "analyticsNodes": 0,
                 "electableNodes": 2,
                 "priority": 7,
                 "readOnlyNodes": 0
               },
               "US_WEST_1": {
                 "analyticsNodes": 0,
                 "electableNodes": 1,
                 "priority": 6,
                 "readOnlyNodes": 0
               }
             }
           }
         ]
       }'
