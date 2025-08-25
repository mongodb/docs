curl -s "https://data.mongodb-api.com/app/myapp-abcde/endpoint/hello" \
  -X POST \
  -H "Accept: application/json" \
  -H "email: bob@example" \
  -H "password: Pa55w0rd!" \
  -d '{ "name": "Bob" }'
