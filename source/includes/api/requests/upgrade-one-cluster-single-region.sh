curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --header "Content-Type: application/json" \
     --include \
     --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/{GROUP-ID}/clusters/tenantUpgrade?pretty=true" \
     --data '
       {
         "name": "SingleRegionCluster",
         "diskSizeGB": 100,
         "numShards": 1,
         "providerSettings": {
           "providerName": "AWS",
           "instanceSizeName": "M40",
           "regionName": "US_EAST_1"
         },
         "clusterType" : "REPLICASET",
         "replicationFactor": 3,
         "replicationSpecs": [{
           "numShards": 1,
           "regionsConfig": {
             "US_EAST_1": {
               "analyticsNodes": 0,
               "electableNodes": 3,
               "priority": 7,
               "readOnlyNodes": 0
             }
           },
           "zoneName": "Zone 1"
         }],
         "backupEnabled": false,
         "providerBackupEnabled" : true,
         "autoScaling": {
           "diskGBEnabled": true
         }
       }'
