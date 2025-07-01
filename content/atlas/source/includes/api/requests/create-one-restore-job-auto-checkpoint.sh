curl --user "{USERNAME}:{APIKEY}" --digest \
     --header "Accept: application/json" \
     --header "Content-Type: application/json" \
     --include \
     --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/{GROUP-ID}/clusters/{CLUSTER-NAME}/restoreJobs?pretty=true" \
     --data '
      {
        "delivery" : {
          "methodName" : "AUTOMATED_RESTORE",
          "targetGroupId" : "{TARGET-GROUP-ID}",
          "targetClusterName" : "{TARGET-CLUSTER-NAME}"
        },
        "checkpointId" : "{CHECKPOINT-ID}"
      }'
