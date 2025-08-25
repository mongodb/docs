curl -s "https://data.mongodb-api.com/app/myapp-abcde/endpoint/data/v1/action/insertOne" \
  -X POST \
  -H "Content-Type: application/ejson" \
  -H "Accept: application/json" \
  -H "apiKey: TpqAKQgvhZE4r6AOzpVydJ9a3tB1BLMrgDzLlBLbihKNDzSJWTAHMVbsMoIOpnM6" \
  -d '{
    "dataSource": "mongodb-atlas",
    "database": "learn-data-api",
    "collection": "hello",
    "document": {
      "text": "Hello, world!"
    }
  }'
