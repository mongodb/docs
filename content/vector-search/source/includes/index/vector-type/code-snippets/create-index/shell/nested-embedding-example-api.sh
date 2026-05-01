curl --header "Authorization: Bearer {ACCESS-TOKEN}" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
--include \
--request POST "https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes" \
--data '
  {
    "database": "sample_airbnb",
    "collectionName": "listingsAndReviews",
    "type": "vectorSearch",
    "name": "vector_index",
    "definition": {
      "fields": [
        {
          "type": "vector",
          "path": "reviews.comments_embedding",
          "numDimensions": 1024,
          "similarity": "cosine"
        },
        {
          "type": "filter",
          "path": "address.country"
        },
        {
          "type": "filter",
          "path": "bedrooms"
        },
        {
          "type": "filter",
          "path": "property_type"
        },
        {
          "type": "filter",
          "path": "reviews.date"
        }
      ],
      "nestedRoot": "reviews"
    }
  }'