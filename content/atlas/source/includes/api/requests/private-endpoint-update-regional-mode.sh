curl --header "Authorization: Bearer {ACCESS-TOKEN}" \
     --header "Content-Type: application/json" \
     --include \
     --request PATCH "https://cloud.mongodb.com/api/atlas/v1.0/groups/{GROUP-ID}/privateEndpoint/regionalMode" \
     --data '
       {
         "enabled" : true
       }'
