curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --header "Accept: application/json" \
     --header "Content-Type: application/json" \
     --include \
     --request PUT "https://<OpsManagerHost>:<Port>/api/public/v1.0/usage/groups/{PROJECT-ID}?pretty=true" \
     --data '{
               "name": "physicalHostA",
               "serverType": "PRODUCTION_SERVER",
               "virtualHosts": [
                 {
                   "hostname": "virtual.host.lqhfcxlgzqtimcxf.internal.mongodb-1",
                   "groupId": "{PROJECT-ID}"
                 }
               ]
             }'
