client_api_login() {
  local app_id="$1"
  local provider="$2"
  local client_api_base_url="https://services.cloud.mongodb.com/api/client/v2.0/app/$app_id"
  local client_api_login_url="$client_api_base_url/auth/providers/$provider/login"
  case $provider in
    "anon-user")
      local result=$(
        curl -s "$client_api_login_url" \
          -X POST \
          -H "Content-Type: application/json" \
          -H "Accept: application/json"
      )
      ;;
    "local-userpass")
      local username="$3"
      local password="$4"
      local result=$(
        curl -s "$client_api_login_url" \
          -X POST \
          -H "Content-Type: application/json" \
          -H "Accept: application/json" \
          -d '{
            "username": "'"$username"'",
            "password": "'"$password"'"
          }'
      )
      ;;
    "api-key")
      local API_KEY="$3"
      local result=$(
        curl -s "$client_api_login_url" \
          -X POST \
          -H "Content-Type: application/json" \
          -H "Accept: application/json" \
          -d '{ "key": "'"$API_KEY"'" }'
      )
      ;;
    "custom-token")
      local JWT="$3"
      local result=$(
        curl -s "$client_api_login_url" \
          -X POST \
          -H "Content-Type: application/json" \
          -H "Accept: application/json" \
          -d '{ "key": "'"$JWT"'" }'
      )
      ;;
    "custom-function")
      local result=$(
        curl -s "$client_api_login_url" \
          -X POST \
          -H "Content-Type: application/json" \
          -H "Accept: application/json" \
          -d '{
            "someCustomFunctionArg": "<Login Info>"
          }'
      )
      ;;
    *)
      echo "Unknown provider: $provider"
      exit 1
      ;;
  esac
  # echo "$result"
  local access_token=$(jq -r ".access_token" <<< $result)
  echo "$access_token"
}

get_app_id() {
  local app_name="$1"
  local app_id=$(jq -r ".app_id" "$app_name/realm_config.json")
  echo "$app_id"
}

delete_all_documents() {
  local app_name=$1
  local database=$2
  local collection=$3
  local app_id=$(get_app_id "$app_name")
  local result=$(
    curl -s https://data.mongodb-api.com/app/$app_id/endpoint/data/v1/action/deleteMany \
      -X POST \
      -H "apiKey: $API_KEY" \
      -H 'Content-Type: application/ejson' \
      -H "Accept: application/json" \
      -d '{"dataSource":"mongodb-atlas","database":"'"$database"'","collection":"'"$collection"'","filter":{}}'
  )
  echo "Deleted $(jq -r ".deletedCount" <<< $result) documents from $database.$collection"
}

add_secret () {
  local app_name="$1"
  local app_id=$(get_app_id "$app_name")
  local secret_name="$2"
  local secret_value="$3"
  npx mongodb-realm-cli secrets create --profile "$app_name" --app "$app_id" --name "$secret_name" --value "$secret_value"
}

create_data_api_app () {
  if [ -z "$ATLAS_PUBLIC_API_KEY" ]; then
    echo "You must specify your Atlas Public API Key as the env variable ATLAS_PUBLIC_API_KEY"
    exit 1
  fi
  if [ -z "$ATLAS_PRIVATE_API_KEY" ]; then
    echo "You must specify your Atlas Private API Key as the env variable ATLAS_PRIVATE_API_KEY"
    exit 1
  fi
  local app_name="$1"
  local cluster_name="$2"

  # Create a new base App Services App for this test run
  npx -y mongodb-realm-cli login --profile "$app_name" --api-key $ATLAS_PUBLIC_API_KEY --private-api-key $ATLAS_PRIVATE_API_KEY
  echo "Creating a new App Services App..."
  npx mongodb-realm-cli app create --profile "$app_name" --name $app_name --cluster $cluster_name --cluster-service-name "mongodb-atlas" --location "US-VA" --deployment-model "GLOBAL"
  local app_id=$(get_app_id "$app_name")

  # Add App secrets
  echo "Adding App secrets..."
  add_secret "$app_name" "secret_password" "Super5ecr3tPa55w0rd"
  add_secret "$app_name" "jwt_signing_key" "7A4VvateM9s86tbkfisoLoChjGBjuJnZ"

  # Configure the App
  echo "Configuring the App..."
  ## Rename the base App config file directory. We'll copy a few of these files and throw away the rest.
  mv "$app_name" "$app_name-tmp"
  ## Copy the template App config files that we use for this test.
  cp -r ./backend "$app_name"
  ## Replace the App & Cluster configs with the values from the new App.
  mv "$app_name-tmp/realm_config.json" "$app_name/realm_config.json"
  mv "$app_name-tmp/data_sources/mongodb-atlas/config.json" "$app_name/data_sources/mongodb-atlas/config.json"
  ## Throw away the rest of the base App config files.
  rm -rf "$app_name-tmp"

  # Deploy the updates
  cd "$app_name"
  npx mongodb-realm-cli push --profile "$app_name" --yes
  echo "Successfully configured the App"
  cd ..
}

create_email_password_user () {
  local app_name="$1"
  local username="$2"
  local password="$3"
  local app_id=$(get_app_id "$app_name")
  npx mongodb-realm-cli users create --profile "$app_name" --app "$app_id" --type email --email "$username" --password "$password"
}

create_api_key_user () {
  local app_name="$1"
  local username="$2"
  local app_id=$(get_app_id "$app_name")
  local result=$(
    npx mongodb-realm-cli users create --profile "$app_name" --app "$CLIENT_APP_ID" --type api-key --name "$username" -f json
  )
  local api_key=$(jq -r ".doc.key" <<< $result)
  echo "$api_key"
}

create_jwt () {
  local app_name="$1"
  local app_id=$(get_app_id "$app_name")
  local user_id="$2"
  local jwt=$(
    npx -y jsonwebtokencli@latest \
      --encode \
      --algorithm HS256 \
      --secret "7A4VvateM9s86tbkfisoLoChjGBjuJnZ" \
      "{\"aud\":\"$app_id\",\"sub\":\"$user_id\",\"exp\":2145916800,\"iat\":1516239022}"
  )
  echo $jwt
}

delete_data_api_app () {
  local app_name="$1"
  local app_id=$(get_app_id "$app_name")

  npx mongodb-realm-cli app delete --profile "$app_name" --app "$app_id"
  rm -rf "$app_name"
}
