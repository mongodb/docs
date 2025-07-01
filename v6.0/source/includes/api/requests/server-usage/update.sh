curl --user "{publicApiKey}:{privateApiKey}" --digest \
     --header "Accept: application/json" \
     --header "Content-Type: application/json" \
     --include \
     --request PUT "https://<OpsManagerHost>:<Port>/api/public/v1.0/usage/groups/{groupId}?pretty=true" \
     --data '{
               "name": "physicalHostA",
               "serverType":
                 {
                   "name": "PRODUCTION_SERVER",
                   "label": "Production Server",
                 },
               "virtualHosts": [
                 {
                   "hostname": "virtual.host.lqhfcxlgzqtimcxf.internal.mongodb-1",
                   "groupId": "{groupId}"
                 }
               ]
             }'
