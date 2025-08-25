curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/data/v1/action/aggregate" \
  -X POST \
  -H "apiKey: $API_KEY" \
  -H 'Content-Type: application/ejson' \
  -H "Accept: application/json" \
  -d '{
    "dataSource": "mongodb-atlas",
    "database": "learn-data-api",
    "collection": "tasks",
    "pipeline": [
      {
        "$match": { "status": "complete" }
      },
      {
        "$group": {
          "_id": "$status",
          "count": { "$sum": 1 },
          "tasks": { "$push": "$text" }
        }
      },
      {
        "$sort": { "count": -1 }
      }
    ]
  }'
