curl --header "Authorization: Bearer {ACCESS-TOKEN}" \
  --header "Accept: application/json" \
  --header "Content-Type: application/json" \
  --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/{GROUP-ID}/privateEndpoint/?pretty=true" \
  --data '
    {
      "providerName":"AWS",
      "region":"us-east-1"
    }'