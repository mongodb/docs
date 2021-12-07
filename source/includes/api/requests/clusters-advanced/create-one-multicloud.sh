curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --header "Content-Type: application/json" \
     --include \
     --request POST "https://cloud.mongodb.com/api/atlas/v1.5/groups/{GROUP-ID}/clusters?pretty=true" \
     --data '{
         "clusterType": "REPLICASET",
         "name": "multiCloud",
         "replicationSpecs": [
           {
             "regionConfigs": [
               {
                 "electableSpecs": {
                   "instanceSize": "M10",
                   "nodeCount" : 3
                 },
                 "analyticsSpecs": {
                   "instanceSize": "M10",
                   "nodeCount" : 1
                 },
                 "providerName": "AWS",
                 "priority" : "7",
                 "regionName": "US_EAST_1"
               },
               {
                 "electableSpecs": {
                   "instanceSize": "M10",
                   "nodeCount" : 2
                 },
                 "providerName": "GCP",
                 "priority" : 6,
                 "regionName": "NORTH_AMERICA_NORTHEAST_1"
               }
             ]
           }
         ]
       }'
