curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/data/v1/action/updateMany" \
  -X POST \
  -H "apiKey: $API_KEY" \
  -H 'Content-Type: application/ejson' \
  -H "Accept: application/json" \
  -d '{
    "dataSource": "mongodb-atlas",
    "database": "learn-data-api",
    "collection": "tasks",
    "filter": {
      "status": "open"
    },
    "update": {
      "$set": {
        "status": "complete",
        "completedAt": { "$date": { "$numberLong": "1680105287069" } }
      }
    }
  }'
