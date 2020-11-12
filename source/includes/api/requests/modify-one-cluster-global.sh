curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --header "Content-Type: application/json" \
     --include \
     --request PATCH "https://cloud.mongodb.com/api/atlas/v1.0/groups/5fac2d90d2124a40ce0cfdb5/clusters/TestGlobalCluster?pretty=true" \
     --data '
       {
         "replicationSpecs": [
         {
           "id" : "5fac2d90d2124a40ce0cfdb5",
           "regionsConfig" : {
             "US_WEST_1" : {
               "electableNodes" : 5,
               "priority" : 7,
               "readOnlyNodes" : 0
             }
           },
           "zoneName" : "Zone 1"
         }]
       }'
