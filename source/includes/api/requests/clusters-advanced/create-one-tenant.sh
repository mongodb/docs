curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --header "Content-Type: application/json" \
     --include \
     --request POST "https://cloud.mongodb.com/api/atlas/v1.5/groups/{GROUP-ID}/clusters?pretty=true" \
     --data '{
         "clusterType": "REPLICASET",
         "name": "tenantCluster",
         "replicationSpecs": [
           {
             "regionConfigs": [
               {
                 "electableSpecs": {
                   "instanceSize": "M5"
                 },
                 "providerName": "TENANT",
                 "backingProviderName" : "AWS",
                 "regionName": "US_EAST_1"
               }
             ]
           }
         ]
       }'
