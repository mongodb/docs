curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --header "Content-Type: application/json" \
     --include \
     --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/{GROUP-ID}/clusters?pretty=true" \
     --data '
       {
        "name": "MultiRegionCluster",
        "diskSizeGB": 25,
        "numShards": 1,
        "providerSettings": {
         "providerName": "GCP",
         "instanceSizeName": "M10"
        },
        "clusterType": "REPLICASET",
        "replicationSpecs" : [ {
          "numShards" : 1,
          "regionsConfig" : {
            "EASTERN_US" : {
              "analyticsNodes" : 0,
              "electableNodes" : 2,
              "priority" : 6,
              "readOnlyNodes" : 1
            },
            "US_EAST_4" : {
              "analyticsNodes" : 0,
              "electableNodes" : 0,
              "priority" : 0,
              "readOnlyNodes" : 1
            },
            "WESTERN_US" : {
              "analyticsNodes" : 0,
              "electableNodes" : 3,
              "priority" : 7,
              "readOnlyNodes" : 0
            }
          },
          "zoneName" : "Zone 1"
        } ],
        "backupEnabled": true
       }'
