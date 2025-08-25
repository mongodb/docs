curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/data/v1/action/updateOne" \
  -X POST \
  -H "apiKey: $API_KEY" \
  -H 'Content-Type: application/ejson' \
  -H "Accept: application/json" \
  -d '{
    "dataSource": "mongodb-atlas",
    "database": "learn-data-api",
    "collection": "tasks",
    "filter": {
      "_id": { "$oid": "64224f4d089104f1766116a5" }
    },
    "update": {
      "$set": {
        "status": "complete",
        "completedAt": { "$date": { "$numberLong": "1680105272788" } }
      }
    }
  }'
