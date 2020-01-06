curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
  --header "Accept: application/json" \
  --header "Content-Type: application/json" \
  --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/{GROUP-ID}/privateEndpoint/{privateLinkId}/interfaceEndpoints?pretty=true" \
  --data '
    {
      "interfaceEndpointId":"vpce-0b9c5701325cb15dd"
    }'