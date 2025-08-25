if [ -z "$CLUSTER_NAME" ]; then
  echo "You must specify your Atlas Cluster Name as the env variable CLUSTER_NAME"
  exit 1
fi

source ./utils.sh

app_name="test-custom-endpoints"

oneTimeSetUp() {
  create_data_api_app "$app_name" "$CLUSTER_NAME"
  CLIENT_APP_ID=$(get_app_id "$app_name")
  echo "Creating test users..."
  local now=$(date +%s)
  USERNAME="test-user-$now"
  PASSWORD="Passw0rd!"
  create_email_password_user "$app_name" "$USERNAME" "$PASSWORD"
  API_KEY=$(create_api_key_user "$app_name" "$USERNAME")
  JWT=$(create_jwt "$app_name" "$USERNAME")
}

oneTimeTearDown() {
  [[ "${_shunit_name_}" = 'EXIT' ]] && return 0 # need this to suppress tearDown on script EXIT because apparently "one time" does not mean "only once"...
  delete_data_api_app "$app_name"
}

testHello() {
  local result=$(
    # :snippet-start: hello
    # :replace-start: {
    #    "terms": {
    #       "$CLIENT_APP_ID": "myapp-abcde",
    #       "$API_KEY": "TpqAKQgvhZE4r6AOzpVydJ9a3tB1BLMrgDzLlBLbihKNDzSJWTAHMVbsMoIOpnM6"
    #    }
    # }
    curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/hello" \
      -X POST \
      -H "Accept: application/json" \
      -H "apiKey: $API_KEY" \
      -d '{
        "name": "Casey"
      }'
    # :replace-end:
    # :snippet-end:
  )
  local greeting=$(jq -r ".greeting" <<< "$result")
  assertEquals "Hello, Casey!" "$greeting"
}

testCustomFunctionExample() {
  local result=$(
    # :snippet-start: custom-function-example
    # :replace-start: {
    #    "terms": {
    #       "$CLIENT_APP_ID": "myapp-abcde",
    #       "$API_KEY": "TpqAKQgvhZE4r6AOzpVydJ9a3tB1BLMrgDzLlBLbihKNDzSJWTAHMVbsMoIOpnM6"
    #    }
    # }
    curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/custom" \
      -X POST \
      -H "Accept: application/json" \
      -H "apiKey: $API_KEY" \
      -d '{
        "type": "event",
        "date": "2024-01-01T00:00:00.000Z",
        "name": "New Year Begins",
        "comment": "Happy New Year!"
      }'
    # :replace-end:
    # :snippet-end:
  )
  local message=$(jq -r ".message" <<< "$result")
  local insertedId=$(jq -r ".insertedId" <<< "$result")
  assertEquals "Successfully saved the request body" "$message"
  assertNotNull "Missing insertedId" "$insertedId"
}

testHelloLatest() {
  local jsonResult=$(
    # :snippet-start: hello-latest-json
    # :replace-start: {
    #    "terms": {
    #       "$CLIENT_APP_ID": "myapp-abcde",
    #       "$API_KEY": "TpqAKQgvhZE4r6AOzpVydJ9a3tB1BLMrgDzLlBLbihKNDzSJWTAHMVbsMoIOpnM6"
    #    }
    # }
    curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/hello/latest" \
      -X GET \
      -H "Accept: application/json" \
      -H "apiKey: $API_KEY"
    # :replace-end:
    # :snippet-end:
  )
  local jsonGreeting=$(jq -r ".greeting" <<< "$jsonResult")
  local jsonDate=$(jq -r ".date" <<< "$jsonResult")
  assertEquals "Hello, Leafie!" "$jsonGreeting"
  assertEquals "2023-05-05T01:02:03.456Z" "$jsonDate"

  local ejsonResult=$(
    # :snippet-start: hello-latest-ejson
    # :replace-start: {
    #    "terms": {
    #       "$CLIENT_APP_ID": "myapp-abcde",
    #       "$API_KEY": "TpqAKQgvhZE4r6AOzpVydJ9a3tB1BLMrgDzLlBLbihKNDzSJWTAHMVbsMoIOpnM6"
    #    }
    # }
    curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/hello/latest" \
      -X GET \
      -H "Accept: application/ejson" \
      -H "apiKey: $API_KEY"
    # :replace-end:
    # :snippet-end:
  )
  local ejsonGreeting=$(jq -r ".greeting" <<< "$ejsonResult")
  local ejsonDate=$(jq -r ".date" <<< "$ejsonResult")
  local ejsonDate_ms=$(jq -r '.["$date"]["$numberLong"]' <<< "$ejsonDate")
  assertEquals "Hello, Leafie!" "$ejsonGreeting"
  assertEquals "1683248523456" "$ejsonDate_ms"
}

testAuthHeaders() {
  local apiKeyResult=$(
    # :snippet-start: auth-apiKey
    # :replace-start: {
    #    "terms": {
    #       "$CLIENT_APP_ID": "myapp-abcde",
    #       "$API_KEY": "TpqAKQgvhZE4r6AOzpVydJ9a3tB1BLMrgDzLlBLbihKNDzSJWTAHMVbsMoIOpnM6"
    #    }
    # }
    curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/hello" \
      -X POST \
      -H "Accept: application/json" \
      -H "apiKey: $API_KEY" \
      -d '{ "name": "Alice" }'
    # :replace-end:
    # :snippet-end:
  )
  local apiKeyGreeting=$(jq -r ".greeting" <<< "$apiKeyResult")
  assertEquals "Hello, Alice!" "$apiKeyGreeting"

  local emailPasswordResult=$(
    # :snippet-start: auth-emailPassword
    # :replace-start: {
    #    "terms": {
    #       "$CLIENT_APP_ID": "myapp-abcde",
    #       "$USERNAME": "bob@example",
    #       "$PASSWORD": "Pa55w0rd!"
    #    }
    # }
    curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/hello" \
      -X POST \
      -H "Accept: application/json" \
      -H "email: $USERNAME" \
      -H "password: $PASSWORD" \
      -d '{ "name": "Bob" }'
    # :replace-end:
    # :snippet-end:
  )
  local emailPasswordGreeting=$(jq -r ".greeting" <<< "$emailPasswordResult")
  assertEquals "Hello, Bob!" "$emailPasswordGreeting"

  local jwtTokenStringResult=$(
    # :snippet-start: auth-jwtTokenString
    # :replace-start: {
    #    "terms": {
    #       "$CLIENT_APP_ID": "myapp-abcde",
    #       "$JWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ0ZXN0LWN1c3RvbS1lbmRwb2ludHMtZWhtenQiLCJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoyMTQ1OTE2ODAwfQ.pIMvnXWrcDvmPzmE33ZPrwkBAFSwy-GxW8sP-qLtYiw"
    #    }
    # }
    curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/hello" \
      -X POST \
      -H "Accept: application/json" \
      -H "jwtTokenString: $JWT" \
      -d '{ "name": "Carlos" }'
    # :replace-end:
    # :snippet-end:
  )
  local jwtTokenStringGreeting=$(jq -r ".greeting" <<< "$jwtTokenStringResult")
  assertEquals "Hello, Carlos!" "$jwtTokenStringGreeting"
}

testValidationSecretQueryParam() {
  local secretParamResult=$(
    # :snippet-start: validation-secret-query-param
    # :replace-start: {
    #    "terms": {
    #       "$CLIENT_APP_ID": "myapp-abcde",
    #       "$API_KEY": "TpqAKQgvhZE4r6AOzpVydJ9a3tB1BLMrgDzLlBLbihKNDzSJWTAHMVbsMoIOpnM6"
    #    }
    # }
    curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/passwordRequired?secret=Super5ecr3tPa55w0rd" \
      -X GET \
      -H "Accept: application/json" \
      -H "apiKey: $API_KEY" \
      -d '{ "data": "VGhpcyBpcyBzb21lIGRhdGEgdGhhdCB3YXMgZW5jb2RlZCBhcyBhIEJhc2U2NCBBU0NJSSBzdHJpbmc=" }'
    # :replace-end:
    # :snippet-end:
  )

  local ok=$(jq -r ".ok" <<< "$secretParamResult")
  assertEquals "1" "$ok"
}

testValidationPayloadSignature() {
  local signatureResult=$(
    # :snippet-start: validation-payload-signature
    # :replace-start: {
    #    "terms": {
    #       "$CLIENT_APP_ID": "myapp-abcde",
    #       "$API_KEY": "TpqAKQgvhZE4r6AOzpVydJ9a3tB1BLMrgDzLlBLbihKNDzSJWTAHMVbsMoIOpnM6"
    #    }
    # }
    curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/sendMessage" \
      -X POST \
      -H "Accept: application/json" \
      -H "apiKey: $API_KEY" \
      -H "Endpoint-Signature: sha256=d4f0537db4e230d7a6028a6f7c3bb1b57c9d16f39176d78697e559ac333e0b36" \
      -d '{ "message": "Hello!" }'
    # :replace-end:
    # :snippet-end:
  )

  local ok=$(jq -r ".ok" <<< "$signatureResult")
  assertEquals "1" "$ok"
}

. shunit2
