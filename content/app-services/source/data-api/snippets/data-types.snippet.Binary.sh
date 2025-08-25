curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/data/v1/action/insertOne" \
  -X POST \
  -H "apiKey: $API_KEY" \
  -H 'Content-Type: application/ejson' \
  -H "Accept: application/json" \
  -d '{
    "dataSource": "<cluster name>",
    "database": "<database name>",
    "collection": "<collection name>",
    "document": { "_id": { "$oid":"645404f4ee8583002fc5a77e" },
      "data": {
        "$binary": {
          "base64": "46d989eaf0bde5258029534bc2dc2089",
          "subType": "05"
        }
      }
    }
  }'
