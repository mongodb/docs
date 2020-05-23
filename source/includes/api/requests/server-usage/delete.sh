curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --header "Accept: application/json" \
     --header "Content-Type: application/json" \
     --include \
     --request DELETE "https://<OpsManagerHost>:<Port>/api/public/v1.0/usage/groups/{PHYSICAL-HOST-ID}?pretty=true"
