curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --header "Accept: application/json" \
     --request PATCH "https://cloud.mongodb.com/api/atlas/v1.0/groups/{GROUP-ID}/privateEndpoint/serverless/instance/
     {INSTANCE-NAME}/endpoint/{ENDPOINT-ID}?pretty=true"
     --data '
       {
         "cloudProviderEndpointId" : "vpce-fcac938279cd98dc894",
          "providerName" : "AWS"
       }'

