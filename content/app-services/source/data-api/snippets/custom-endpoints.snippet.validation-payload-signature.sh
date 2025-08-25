curl -s "https://data.mongodb-api.com/app/myapp-abcde/endpoint/sendMessage" \
  -X POST \
  -H "Accept: application/json" \
  -H "apiKey: TpqAKQgvhZE4r6AOzpVydJ9a3tB1BLMrgDzLlBLbihKNDzSJWTAHMVbsMoIOpnM6" \
  -H "Endpoint-Signature: sha256=d4f0537db4e230d7a6028a6f7c3bb1b57c9d16f39176d78697e559ac333e0b36" \
  -d '{ "message": "Hello!" }'
