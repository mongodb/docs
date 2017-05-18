curl --user "{username}:{apiKey}" --digest \
 --header "Accept: application/json" \
 --header "Content-Type: application/json" \
 --include --request PATCH "https://cloud.mongodb.com/api/public/v1.0/groups/{GROUP-ID}/backupConfigs/{CLUSTER-ID}" 
 --include --request PATCH "https://{opsManagerHost}:{port}/api/public/v1.0/groups/{GROUP-ID}/backupConfigs/{CLUSTER-ID}" \
 --data '
 {
   "statusName": "STOPPED"
 }'