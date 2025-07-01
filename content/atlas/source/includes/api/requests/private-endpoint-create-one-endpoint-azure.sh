curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --header "Accept: application/json" \
     --header "Content-Type: application/json" \
     --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/{GROUP-ID}/privateEndpoint/AZURE/endpointService/{ENDPOINT-SERVICE-ID}/endpoint?pretty=true" \
     --data '
       {
         "id" : "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/privatelink/providers/Microsoft.Network/privateEndpoints/test",
         "privateEndpointIPAddress" : "10.0.0.4"
       }'
