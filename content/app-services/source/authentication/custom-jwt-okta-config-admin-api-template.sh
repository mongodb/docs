curl "https://services.cloud.mongodb.com/api/admin/v3.0/groups/$PROJECT_ID/apps/$APP_ID/auth_providers" \
  -X "POST" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "custom-token",
    "type": "custom-token",
    "disabled": false,
    "config": {
      "audience": [],
      "jwkURI": "https://<Your Okta Domain>/oauth2/<Your Authorization Server ID>/v1/keys",
      "useJWKURI": true
    },
    "secret_config": {
      "signingKeys": []
    },
    "metadata_fields": []
  }'
