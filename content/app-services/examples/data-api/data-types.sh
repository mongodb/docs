if [ -z "$CLUSTER_NAME" ]; then
  echo "You must specify your Atlas Cluster Name as the env variable CLUSTER_NAME"
  exit 1
fi

source ./utils.sh

app_name="test-data-types"

oneTimeSetUp() {
  create_data_api_app "$app_name" "$CLUSTER_NAME"
  CLIENT_APP_ID=$(get_app_id "$app_name")
  echo "Creating test users..."
  local now=$(date +%s)
  local username="test-user-$now"
  local password="Passw0rd!"
  create_email_password_user "$app_name" "$username" "$password"
  API_KEY=$(create_api_key_user "$app_name" "$username")

  # Delete any existing data in the test collections, e.g. from other failed test runs
  echo "Preparing test collections..."
  delete_all_documents "$app_name" "learn-data-api" "data-types"
  echo "Successfully prepared test collections"
}

oneTimeTearDown() {
  [[ "${_shunit_name_}" = 'EXIT' ]] && return 0 # need this to suppress tearDown on script EXIT because apparently "one time" does not mean "only once"...
  delete_data_api_app "$app_name"
}

testBinary() {
  result=$(
    # :snippet-start: Binary
    # :replace-start: {
    #    "terms": {
    #       "mongodb-atlas": "<cluster name>",
    #       "learn-data-api": "<database name>",
    #       "data-types": "<collection name>",
    #       " \"_id\": { \"$oid\": \"645404f4ee8583002fc5a77e\" },": ""
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
        "collection": "data-types",
        "document": { "_id": { "$oid":"645404f4ee8583002fc5a77e" },
          "data": {
            "$binary": {
              "base64": "46d989eaf0bde5258029534bc2dc2089",
              "subType": "05"
            }
          }
        }
      }'
    # :replace-end:
    # :snippet-end:
  )
  local insertedId=$(jq -r ".insertedId" <<< "$result")
  assertEquals "645404f4ee8583002fc5a77e" $insertedId
}


testDate() {
  canonicalResult=$(
    # :snippet-start: Date-Canonical
    # :replace-start: {
    #    "terms": {
    #       "mongodb-atlas": "<cluster name>",
    #       "learn-data-api": "<database name>",
    #       "data-types": "<collection name>",
    #       " \"_id\": { \"$oid\": \"64540a2ec3a295cbcce82163\" },": ""
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
        "collection": "data-types",
        "document": { "_id": { "$oid": "64540a2ec3a295cbcce82163" },
          "createdAt": { "$date": { "$numberLong": "1638551310749" } }
        }
      }'
    # :replace-end:
    # :snippet-end:
  )
  local insertedId=$(jq -r ".insertedId" <<< "$canonicalResult")
  assertEquals "64540a2ec3a295cbcce82163" "$insertedId"

  relaxedResult=$(
    # :snippet-start: Date-Relaxed
    # :replace-start: {
    #    "terms": {
    #       "mongodb-atlas": "<cluster name>",
    #       "learn-data-api": "<database name>",
    #       "data-types": "<collection name>",
    #       " \"_id\": { \"$oid\": \"64540a585ed1111e93d02a6d\" },": ""
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
        "collection": "data-types",
        "document": { "_id": { "$oid": "64540a585ed1111e93d02a6d" },
          "createdAt": { "$date": "2021-12-03T17:08:30.749Z" }
        }
      }'
    # :replace-end:
    # :snippet-end:
  )
  local insertedId=$(jq -r ".insertedId" <<< "$relaxedResult")
  assertEquals "64540a585ed1111e93d02a6d" "$insertedId"
}

testDecimal128() {
  result=$(
    # :snippet-start: Decimal128
    # :replace-start: {
    #    "terms": {
    #       "mongodb-atlas": "<cluster name>",
    #       "learn-data-api": "<database name>",
    #       "data-types": "<collection name>",
    #       " \"_id\": { \"$oid\": \"64540b2936fd7d4d69bf7faf\" },": ""
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
        "collection": "data-types",
        "document": { "_id": { "$oid": "64540b2936fd7d4d69bf7faf" },
          "accountBalance": { "$numberDecimal": "128452.420523" }
        }
      }'
    # :replace-end:
    # :snippet-end:
  )
  local insertedId=$(jq -r ".insertedId" <<< "$result")
  assertEquals "64540b2936fd7d4d69bf7faf" "$insertedId"
}

testDouble() {
  canonicalResult=$(
    # :snippet-start: Double-Canonical
    # :replace-start: {
    #    "terms": {
    #       "mongodb-atlas": "<cluster name>",
    #       "learn-data-api": "<database name>",
    #       "data-types": "<collection name>",
    #       " \"_id\": { \"$oid\": \"645422189a49b0668a3d02c8\" },": ""
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
        "collection": "data-types",
        "document": { "_id": { "$oid": "645422189a49b0668a3d02c8" },
          "temperatureCelsius": { "$numberDouble": "23.847" }
        }
      }'
    # :replace-end:
    # :snippet-end:
  )
  local insertedId=$(jq -r ".insertedId" <<< "$canonicalResult")
  assertEquals "645422189a49b0668a3d02c8" "$insertedId"

  relaxedResult=$(
    # :snippet-start: Double-Relaxed
    # :replace-start: {
    #    "terms": {
    #       "mongodb-atlas": "<cluster name>",
    #       "learn-data-api": "<database name>",
    #       "data-types": "<collection name>",
    #       " \"_id\": { \"$oid\": \"6454220b8962b2a4728da6c2\" },": ""
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
        "collection": "data-types",
        "document": { "_id": { "$oid": "6454220b8962b2a4728da6c2" },
          "temperatureCelsius": 23.847
        }
      }'
    # :replace-end:
    # :snippet-end:
  )
  local insertedId=$(jq -r ".insertedId" <<< "$relaxedResult")
  assertEquals "6454220b8962b2a4728da6c2" "$insertedId"
}

testInt32() {
  canonicalResult=$(
    # :snippet-start: Int32-Canonical
    # :replace-start: {
    #    "terms": {
    #       "mongodb-atlas": "<cluster name>",
    #       "learn-data-api": "<database name>",
    #       "data-types": "<collection name>",
    #       " \"_id\": { \"$oid\": \"645421b3d5068899e28a489d\" },": ""
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
        "collection": "data-types",
        "document": { "_id": { "$oid": "645421b3d5068899e28a489d" },
          "coins": { "$numberInt": "2147483647" }
        }
      }'
    # :replace-end:
    # :snippet-end:
  )
  local insertedId=$(jq -r ".insertedId" <<< "$canonicalResult")
  assertEquals "645421b3d5068899e28a489d" "$insertedId"

  relaxedResult=$(
    # :snippet-start: Int32-Relaxed
    # :replace-start: {
    #    "terms": {
    #       "mongodb-atlas": "<cluster name>",
    #       "learn-data-api": "<database name>",
    #       "data-types": "<collection name>",
    #       " \"_id\": { \"$oid\": \"645421df8fd5ee797aa1d2a9\" },": ""
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
        "collection": "data-types",
        "document": { "_id": { "$oid": "645421df8fd5ee797aa1d2a9" },
          "coins": 2147483647
        }
      }'
    # :replace-end:
    # :snippet-end:
  )
  local insertedId=$(jq -r ".insertedId" <<< "$relaxedResult")
  assertEquals "645421df8fd5ee797aa1d2a9" "$insertedId"
}

testInt64() {
  result=$(
    # :snippet-start: Int64
    # :replace-start: {
    #    "terms": {
    #       "mongodb-atlas": "<cluster name>",
    #       "learn-data-api": "<database name>",
    #       "data-types": "<collection name>",
    #       " \"_id\": { \"$oid\": \"645421504f95e28eeb2a8dba\" },": ""
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
        "collection": "data-types",
        "document": { "_id": { "$oid": "645421504f95e28eeb2a8dba" },
          "population": { "$numberLong": "8047923148" }
        }
      }'
    # :replace-end:
    # :snippet-end:
  )
  local insertedId=$(jq -r ".insertedId" <<< "$result")
  assertEquals "645421504f95e28eeb2a8dba" "$insertedId"
}

testObjectId() {
  result=$(
    # :snippet-start: ObjectId
    # :replace-start: {
    #    "terms": {
    #       "mongodb-atlas": "<cluster name>",
    #       "learn-data-api": "<database name>",
    #       "data-types": "<collection name>"
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
        "collection": "data-types",
        "document": {
          "_id": { "$oid": "61f02ea3af3561e283d06b91" }
        }
      }'
    # :replace-end:
    # :snippet-end:
  )
  local insertedId=$(jq -r ".insertedId" <<< "$result")
  assertEquals "61f02ea3af3561e283d06b91" "$insertedId"
}

. shunit2
