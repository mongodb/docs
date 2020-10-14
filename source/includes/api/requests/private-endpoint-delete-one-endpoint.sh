curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --header "Accept: application/json" \
     --request DELETE "https://cloud.mongodb.com/api/atlas/v1.0/groups/{GROUP-ID}/privateEndpoint/{CLOUD-PROVIDER}/endpointService/{ENDPOINT-SERVICE-ID}/endpoint/{ENDPOINT-ID}?pretty=true"
