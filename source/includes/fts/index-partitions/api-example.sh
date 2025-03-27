curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
--include \
--request POST "https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes" \
--data '
  {
  "collectionName": "movies",
  "database": "sample_mflix",
  "name": "partitioned_index",
  "type": "search",
  "definition": {
    "analyzer": "lucene.standard",
    "mappings": {
      "dynamic": true,
    },
    "numPartitions": 4,
    "searchAnalyzer": "lucene.standard"
  }
}'