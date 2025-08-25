curl -s "https://data.mongodb-api.com/app/myapp-abcde/endpoint/data/v1/action/findOne" \
  -X POST \
  -H "Accept: application/json" \
  -H "email: bob@example" \
  -H "password: Pa55w0rd!" \
  -d '{
    "dataSource": "mongodb-atlas",
    "database": "sample_mflix",
    "collection": "movies",
    "filter": {
      "title": "The Matrix"
    }
  }'
