curl --request POST \
  --header "Authorization: Bearer {ACCESS-TOKEN}" \
  --header "Accept: application/vnd.atlas.preview+json" \
  --include \
  "https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/autoEmbeddingInference:reset"
