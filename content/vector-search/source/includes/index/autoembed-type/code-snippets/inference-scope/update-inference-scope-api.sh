curl --request PATCH \
  --header "Authorization: Bearer {ACCESS-TOKEN}" \
  --header "Accept: application/vnd.atlas.preview+json" \
  --header "Content-Type: application/vnd.atlas.preview+json" \
  --include \
  --data '{ "configured": { "cloud": "ANY", "geography": "EU" } }' \
  "https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/autoEmbeddingInference"
