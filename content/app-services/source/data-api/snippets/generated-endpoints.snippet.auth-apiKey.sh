curl -s "https://data.mongodb-api.com/app/myapp-abcde/endpoint/data/v1/action/findOne" \
  -X POST \
  -H "Accept: application/json" \
  -H "apiKey: TpqAKQgvhZE4r6AOzpVydJ9a3tB1BLMrgDzLlBLbihKNDzSJWTAHMVbsMoIOpnM6" \
  -d '{
    "dataSource": "mongodb-atlas",
    "database": "sample_mflix",
    "collection": "movies",
    "filter": {
      "title": "The Matrix"
    }
  }'
