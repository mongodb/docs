curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --header "Accept: application/json" \
     --header "Content-Type: application/json" \
     --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/{GROUP-ID}/privateEndpoint/AWS/endpointService/{ENDPOINT-SERVICE-ID}/endpoint?pretty=true" \
     --data '
       {
         "id" : "vpce-0d00c26273372c6ef"
       }'
