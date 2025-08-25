curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/data/v1/action/findOne" \
  -X POST \
  -H "apiKey: $API_KEY" \
  -H 'Content-Type: application/ejson' \
  -H "Accept: application/json" \
  -d '{
    "dataSource": "mongodb-atlas",
    "database": "learn-data-api",
    "collection": "tasks",
    "filter": {
      "text": "Do the dishes"
    }
  }'
