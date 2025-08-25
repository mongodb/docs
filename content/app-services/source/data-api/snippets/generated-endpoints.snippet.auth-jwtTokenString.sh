curl -s "https://data.mongodb-api.com/app/myapp-abcde/endpoint/data/v1/action/findOne" \
  -X POST \
  -H "Accept: application/json" \
  -H "jwtTokenString: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJteWFwcC1hYmNkZSIsInN1YiI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UiLCJleHAiOjIxNDU5MTY4MDB9.E4fSNtYc0t5XCTv3S8W89P9PKLftC4POLRZdN2zOICI" \
  -d '{
    "dataSource": "mongodb-atlas",
    "database": "sample_mflix",
    "collection": "movies",
    "filter": {
      "title": "The Matrix"
    }
  }'
