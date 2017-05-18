curl --user "{username}:{apiKey}" --digest \
 --header "Accept: application/json" \
 --include
 --request GET "https://cloud.mongodb.com/api/public/v1.0/groups/{GROUP-ID}/backupConfigs/{CLUSTER-ID}"
 --request GET "https://{opsManagerHost}:{port}/api/public/v1.0/groups/{GROUP-ID}/backupConfigs/{CLUSTER-ID}"
