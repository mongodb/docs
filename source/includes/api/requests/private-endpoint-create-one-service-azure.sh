curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --header "Accept: application/json" \
     --header "Content-Type: application/json" \
     --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/{GROUP-ID}/privateEndpoint/endpointService?pretty=true" \
     --data '
       {
         "providerName" : "AZURE",
         "region" : "eastus2"
       }'
