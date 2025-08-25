if [ -z "$CLUSTER_NAME" ]; then
  echo "You must specify your Atlas Cluster Name as the env variable CLUSTER_NAME"
  exit 1
fi

source ./utils.sh

app_name="test-generated-endpoints"

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

  # Delete any existing data in the test collections, e.g. from other failed test runs
  echo "Preparing test collections..."
  delete_all_documents "$app_name" "learn-data-api" "hello"
  delete_all_documents "$app_name" "learn-data-api" "tasks"
  echo "Successfully prepared test collections"
}

oneTimeTearDown() {
  [[ "${_shunit_name_}" = 'EXIT' ]] && return 0 # need this to suppress tearDown on script EXIT because apparently "one time" does not mean "only once"...
  delete_data_api_app "$app_name"
}

testHelloWorld() {
  result=$(
    # :snippet-start: hello-world
    # :replace-start: {
    #    "terms": {
    #       "$CLIENT_APP_ID": "myapp-abcde",
    #       "$API_KEY": "TpqAKQgvhZE4r6AOzpVydJ9a3tB1BLMrgDzLlBLbihKNDzSJWTAHMVbsMoIOpnM6",
    #       " \"_id\": { \"$oid\": \"64224f3cd79f54ad342dd9b1\" },": ""
    #    }
    # }
    curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/data/v1/action/insertOne" \
      -X POST \
      -H "Content-Type: application/ejson" \
      -H "Accept: application/json" \
      -H "apiKey: $API_KEY" \
      -d '{
        "dataSource": "mongodb-atlas",
        "database": "learn-data-api",
        "collection": "hello",
        "document": { "_id": { "$oid": "64224f3cd79f54ad342dd9b1" },
          "text": "Hello, world!"
        }
      }'
    # :replace-end:
    # :snippet-end:
  )
  local insertedId=$(jq -r ".insertedId" <<< "$result")
  assertEquals "64224f3cd79f54ad342dd9b1" "$insertedId"
}

testApiKeyAuthHeader() {
  local result=$(
    # :snippet-start: auth-apiKey
    # :replace-start: {
    #    "terms": {
    #       "$CLIENT_APP_ID": "myapp-abcde",
    #       "$API_KEY": "TpqAKQgvhZE4r6AOzpVydJ9a3tB1BLMrgDzLlBLbihKNDzSJWTAHMVbsMoIOpnM6"
    #    }
    # }
    curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/data/v1/action/findOne" \
      -X POST \
      -H "Accept: application/json" \
      -H "apiKey: $API_KEY" \
      -d '{
        "dataSource": "mongodb-atlas",
        "database": "sample_mflix",
        "collection": "movies",
        "filter": {
          "title": "The Matrix"
        }
      }'
    # :replace-end:
    # :snippet-end:
  )
  local title=$(jq -r ".document.title" <<< "$result")
  assertEquals "The Matrix" "$title"
}

testEmailPasswordAuthHeader() {
  local result=$(
    # :snippet-start: auth-emailPassword
    # :replace-start: {
    #    "terms": {
    #       "$CLIENT_APP_ID": "myapp-abcde",
    #       "$USERNAME": "bob@example",
    #       "$PASSWORD": "Pa55w0rd!"
    #    }
    # }
    curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/data/v1/action/findOne" \
      -X POST \
      -H "Accept: application/json" \
      -H "email: $USERNAME" \
      -H "password: $PASSWORD" \
      -d '{
        "dataSource": "mongodb-atlas",
        "database": "sample_mflix",
        "collection": "movies",
        "filter": {
          "title": "The Matrix"
        }
      }'
    # :replace-end:
    # :snippet-end:
  )
  local title=$(jq -r ".document.title" <<< "$result")
  assertEquals "The Matrix" "$title"
}

testJWTAuthHeader() {
  local result=$(
    # :snippet-start: auth-jwtTokenString
    # :replace-start: {
    #    "terms": {
    #       "$CLIENT_APP_ID": "myapp-abcde",
    #       "$JWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJteWFwcC1hYmNkZSIsInN1YiI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UiLCJleHAiOjIxNDU5MTY4MDB9.E4fSNtYc0t5XCTv3S8W89P9PKLftC4POLRZdN2zOICI"
    #    }
    # }
    curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/data/v1/action/findOne" \
      -X POST \
      -H "Accept: application/json" \
      -H "jwtTokenString: $JWT" \
      -d '{
        "dataSource": "mongodb-atlas",
        "database": "sample_mflix",
        "collection": "movies",
        "filter": {
          "title": "The Matrix"
        }
      }'
    # :replace-end:
    # :snippet-end:
  )
  local title=$(jq -r ".document.title" <<< "$result")
  assertEquals "The Matrix" "$title"
}

testBearerAuthHeader() {
  local ACCESS_TOKEN=$(client_api_login "$CLIENT_APP_ID" "api-key" "$API_KEY")
  local result=$(
    # :snippet-start: auth-bearer
    # :replace-start: {
    #    "terms": {
    #       "$CLIENT_APP_ID": "myapp-abcde",
    #       "$JWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJteWFwcC1hYmNkZSIsInN1YiI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UiLCJleHAiOjIxNDU5MTY4MDB9.E4fSNtYc0t5XCTv3S8W89P9PKLftC4POLRZdN2zOICI"
    #    }
    # }
    curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/data/v1/action/findOne" \
      -X POST \
      -H "Accept: application/json" \
      -H "Authorization: Bearer $ACCESS_TOKEN" \
      -d '{
        "dataSource": "mongodb-atlas",
        "database": "sample_mflix",
        "collection": "movies",
        "filter": {
          "title": "The Matrix"
        }
      }'
    # :replace-end:
    # :snippet-end:
  )
  local title=$(jq -r ".document.title" <<< "$result")
  assertEquals "The Matrix" "$title"
}

testInsertOne() {
  result=$(
    # :snippet-start: insertOne
    # :replace-start: {
    #    "terms": {
    #       " \"_id\": { \"$oid\": \"64224f3cd79f54ad342dd9b2\" },": ""
    #    }
    # }
    curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/data/v1/action/insertOne" \
      -X POST \
      -H "apiKey: $API_KEY" \
      -H 'Content-Type: application/ejson' \
      -H "Accept: application/json" \
      -d '{
        "dataSource": "mongodb-atlas",
        "database": "learn-data-api",
        "collection": "tasks",
        "document": { "_id": { "$oid": "64224f3cd79f54ad342dd9b2" },
          "status": "open",
          "text": "Do the dishes"
        }
      }'
    # :replace-end:
    # :snippet-end:
  )
  local insertedId=$(jq -r ".insertedId" <<< "$result")
  assertEquals "64224f3cd79f54ad342dd9b2" $insertedId
}

testInsertMany() {
  result=$(
    # :snippet-start: insertMany
    # :replace-start: {
    #    "terms": {
    #       " \"_id\": { \"$oid\": \"64224f4d089104f1766116a5\" },": "",
    #       " \"_id\": { \"$oid\": \"64224f57f56e634f459586f0\" },": ""
    #    }
    # }
    curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/data/v1/action/insertMany" \
      -X POST \
      -H "apiKey: $API_KEY" \
      -H 'Content-Type: application/ejson' \
      -H "Accept: application/json" \
      -d '{
        "dataSource": "mongodb-atlas",
        "database": "learn-data-api",
        "collection": "tasks",
        "documents": [
          { "_id": { "$oid": "64224f4d089104f1766116a5" },
            "status": "open",
            "text": "Mop the floor"
          },
          { "_id": { "$oid": "64224f57f56e634f459586f0" },
            "status": "open",
            "text": "Clean the windows"
          }
        ]
      }'
    # :replace-end:
    # :snippet-end:
  )
  local insertedIds=$(jq -rc ".insertedIds" <<< "$result")
  assertEquals '["64224f4d089104f1766116a5","64224f57f56e634f459586f0"]' $insertedIds
}

testUpdateOne() {
  result=$(
    # :snippet-start: updateOne
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
    # :snippet-end:
  )
  local matchedCount=$(jq -rc ".matchedCount" <<< "$result")
  local modifiedCount=$(jq -rc ".modifiedCount" <<< "$result")
  assertEquals 1 $matchedCount
  assertEquals 1 $modifiedCount
}

testUpdateMany() {
  result=$(
    # :snippet-start: updateMany
    curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/data/v1/action/updateMany" \
      -X POST \
      -H "apiKey: $API_KEY" \
      -H 'Content-Type: application/ejson' \
      -H "Accept: application/json" \
      -d '{
        "dataSource": "mongodb-atlas",
        "database": "learn-data-api",
        "collection": "tasks",
        "filter": {
          "status": "open"
        },
        "update": {
          "$set": {
            "status": "complete",
            "completedAt": { "$date": { "$numberLong": "1680105287069" } }
          }
        }
      }'
    # :snippet-end:
  )
  local matchedCount=$(jq -rc ".matchedCount" <<< "$result")
  local modifiedCount=$(jq -rc ".modifiedCount" <<< "$result")
  assertEquals 2 $matchedCount
  assertEquals 2 $modifiedCount
}

testFindOne() {
  result=$(
    # :snippet-start: findOne
    curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/data/v1/action/findOne" \
      -X POST \
      -H "apiKey: $API_KEY" \
      -H 'Content-Type: application/ejson' \
      -H "Accept: application/json" \
      -d '{
        "dataSource": "mongodb-atlas",
        "database": "learn-data-api",
        "collection": "tasks",
        "filter": {
          "text": "Do the dishes"
        }
      }'
    # :snippet-end:
  )
  local document=$(jq -rc ".document" <<< "$result")
  assertEquals '{"_id":"64224f3cd79f54ad342dd9b2","status":"complete","text":"Do the dishes","completedAt":"2023-03-29T15:54:47.069Z"}' "$document"
}

testFindMany() {
  result=$(
    # :snippet-start: find
    curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/data/v1/action/find" \
      -X POST \
      -H "apiKey: $API_KEY" \
      -H 'Content-Type: application/ejson' \
      -H "Accept: application/json" \
      -d '{
        "dataSource": "mongodb-atlas",
        "database": "learn-data-api",
        "collection": "tasks",
        "filter": {
          "status": "complete"
        },
        "sort": { "completedAt": 1 },
        "limit": 10
      }'
    # :snippet-end:
  )
  local documents=$(jq -rc ".documents" <<< "$result")
  assertEquals '[{"_id":"64224f4d089104f1766116a5","status":"complete","text":"Mop the floor","completedAt":"2023-03-29T15:54:32.788Z"},{"_id":"64224f3cd79f54ad342dd9b2","status":"complete","text":"Do the dishes","completedAt":"2023-03-29T15:54:47.069Z"},{"_id":"64224f57f56e634f459586f0","status":"complete","text":"Clean the windows","completedAt":"2023-03-29T15:54:47.069Z"}]' "$documents"
}

testAggregate() {
  result=$(
    # :snippet-start: aggregate
    curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/data/v1/action/aggregate" \
      -X POST \
      -H "apiKey: $API_KEY" \
      -H 'Content-Type: application/ejson' \
      -H "Accept: application/json" \
      -d '{
        "dataSource": "mongodb-atlas",
        "database": "learn-data-api",
        "collection": "tasks",
        "pipeline": [
          {
            "$match": { "status": "complete" }
          },
          {
            "$group": {
              "_id": "$status",
              "count": { "$sum": 1 },
              "tasks": { "$push": "$text" }
            }
          },
          {
            "$sort": { "count": -1 }
          }
        ]
      }'
    # :snippet-end:
  )
  local documents=$(jq -rc ".documents" <<< "$result")
  assertEquals '[{"_id":"complete","count":3,"tasks":["Do the dishes","Mop the floor","Clean the windows"]}]' "$documents"
}

testReplaceOne() {
  result=$(
    # :snippet-start: replaceOne
    curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/data/v1/action/replaceOne" \
      -X POST \
      -H "apiKey: $API_KEY" \
      -H 'Content-Type: application/ejson' \
      -H "Accept: application/json" \
      -d '{
        "dataSource": "mongodb-atlas",
        "database": "learn-data-api",
        "collection": "tasks",
        "filter": {
          "text": "Clean the windows"
        },
        "replacement": {
          "status": "open",
          "text": "Re-clean the windows"
        }
      }'
    # :snippet-end:
  )
  local matchedCount=$(jq -rc ".matchedCount" <<< "$result")
  local modifiedCount=$(jq -rc ".modifiedCount" <<< "$result")
  assertEquals 1 $matchedCount
  assertEquals 1 $modifiedCount
}

testDeleteOne() {
  result=$(
    # :snippet-start: deleteOne
    curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/data/v1/action/deleteOne" \
      -X POST \
      -H "apiKey: $API_KEY" \
      -H 'Content-Type: application/ejson' \
      -H "Accept: application/json" \
      -d '{
        "dataSource": "mongodb-atlas",
        "database": "learn-data-api",
        "collection": "tasks",
        "filter": {
          "_id": { "$oid": "64224f3cd79f54ad342dd9b2" }
        }
      }'
    # :snippet-end:
  )
  local deletedCount=$(jq -rc ".deletedCount" <<< "$result")
  assertEquals 1 $deletedCount
}

testDeleteMany() {
  result=$(
    # :snippet-start: deleteMany
    curl -s "https://data.mongodb-api.com/app/$CLIENT_APP_ID/endpoint/data/v1/action/deleteMany" \
      -X POST \
      -H "apiKey: $API_KEY" \
      -H 'Content-Type: application/ejson' \
      -H "Accept: application/json" \
      -d '{
        "dataSource": "mongodb-atlas",
        "database": "learn-data-api",
        "collection": "tasks",
        "filter": {
          "status": "complete"
        }
      }'
    # :snippet-end:
  )
  local deletedCount=$(jq -rc ".deletedCount" <<< "$result")
  assertEquals 1 $deletedCount
}

. shunit2
