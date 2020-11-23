curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --header "Content-Type: application/json" \
     --include \
     --request PATCH "https://cloud.mongodb.com/api/atlas/v1.0/groups/{GROUP-ID}/privatEndpoint/regionalMode" \
     --data '
       {
         "enabled" : true
       }'
