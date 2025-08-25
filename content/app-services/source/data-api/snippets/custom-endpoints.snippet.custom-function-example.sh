curl -s "https://data.mongodb-api.com/app/myapp-abcde/endpoint/custom" \
  -X POST \
  -H "Accept: application/json" \
  -H "apiKey: TpqAKQgvhZE4r6AOzpVydJ9a3tB1BLMrgDzLlBLbihKNDzSJWTAHMVbsMoIOpnM6" \
  -d '{
    "type": "event",
    "date": "2024-01-01T00:00:00.000Z",
    "name": "New Year Begins",
    "comment": "Happy New Year!"
  }'
