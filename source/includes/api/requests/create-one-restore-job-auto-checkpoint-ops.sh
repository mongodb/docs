curl --user "{USERNAME}:{APIKEY}" --digest \
  --header "Accept: application/json" \
  --header "Content-Type: application/json" \
  --include \
  --request POST "https://{OPSMANAGER-HOST}:{PORT}/api/public/v1.0/groups/{GROUP-ID}/clusters/{CLUSTER-NAME}/restoreJobs?pretty=true" \
  --data '
   {
     "delivery" : {
       "methodName" : "AUTOMATED_RESTORE",
       "targetGroupId" : "{TARGET-GROUP-ID}",
       "targetClusterId" : "{TARGET-CLUSTER-ID}"
     },
     "checkpointId" : "{CHECKPOINT-ID}"
   }'
