curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
  --header "Accept: application/json" \
  --header "Content-Type: application/json" \
  --include \
  --request POST "https://<OpsManagerHost>:<Port>/api/public/v1.0/groups/{PROJECT-ID}/clusters/{CLUSTER-ID}/restoreJobs?pretty=true" \
  --data '
   {
     "delivery" : {
       "methodName" : "AUTOMATED_RESTORE",
       "targetGroupId" : "{TARGET-PROJECT-ID}",
       "targetClusterId" : "{TARGET-CLUSTER-ID}"
     },
     "checkpointId" : "{CHECKPOINT-ID}"
   }'
