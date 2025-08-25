curl -s "https://data.mongodb-api.com/app/myapp-abcde/endpoint/hello" \
  -X POST \
  -H "Accept: application/json" \
  -H "jwtTokenString: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ0ZXN0LWN1c3RvbS1lbmRwb2ludHMtZWhtenQiLCJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoyMTQ1OTE2ODAwfQ.pIMvnXWrcDvmPzmE33ZPrwkBAFSwy-GxW8sP-qLtYiw" \
  -d '{ "name": "Carlos" }'
