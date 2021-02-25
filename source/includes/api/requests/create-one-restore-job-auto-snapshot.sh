curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --header "Accept: application/json" \
     --header "Content-Type: application/json" \
     --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/{GROUP-ID}/clusters/{CLUSTER-ID}/restoreJobs?pretty=true"
     --data '
       {
         "delivery" : {
           "methodName" : "AUTOMATED_RESTORE",
           "targetGroupId" : "{TARGET-GROUP-ID}",
           "targetClusterId" : "{TARGET-CLUSTER-ID}"
         },
         "snapshotId": "{SNAPSHOT-ID}"
       }'
