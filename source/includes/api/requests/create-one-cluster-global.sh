curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --header "Content-Type: application/json" \
     --include \
     --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/{GROUP-ID}/clusters?pretty=true" \
     --data '
       {
        "name": "TestGlobalCluster",
        "diskSizeGB": 40,
        "providerSettings": {
         "providerName": "GCP",
         "instanceSizeName": "M30"
        },
        "clusterType": "GEOSHARDED",
        "replicationSpecs": [{
         "numShards": 1,
         "regionsConfig": {
          "EASTERN_US": {
           "analyticsNodes": 0,
           "electableNodes": 3,
           "priority": 7,
           "readOnlyNodes": 0
          }
         },
         "zoneName": "Americas"
        }, {
         "numShards": 1,
         "regionsConfig": {
          "EUROPE_WEST_3": {
           "analyticsNodes": 0,
           "electableNodes": 3,
           "priority": 7,
           "readOnlyNodes": 0
          }
         },
         "zoneName": "EMEA"
        }, {
         "numShards": 1,
         "regionsConfig": {
          "SOUTHEASTERN_ASIA_PACIFIC": {
           "analyticsNodes": 0,
           "electableNodes": 3,
           "priority": 7,
           "readOnlyNodes": 0
          }
         },
         "zoneName": "APAC"
        }],
        "backupEnabled": true
       }'
