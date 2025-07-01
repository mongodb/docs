curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --header "Content-Type: application/json" \
     --include \
     --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/{GROUP-ID}/clusters/tenantUpgrade?pretty=true" \
     --data '
       {
         "name": "MultiRegionCluster",
         "diskSizeGB": 25,
         "numShards": 1,
         "providerSettings": {
           "providerName": "AWS",
           "instanceSizeName": "M10"
         },
         "clusterType": "REPLICASET",
         "replicationSpecs": [
           {
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
             },
             "zoneName": "Zone 1"
           }
         ],
         "backupEnabled": true
       }'
