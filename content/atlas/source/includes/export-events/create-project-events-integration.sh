curl --header "Authorization: Bearer {ACCESS-TOKEN}" \
     --header "Content-Type: application/json" \
     --header "Accept: application/vnd.atlas.2025-03-12+json" \
     --include \
     --request POST "https://cloud.mongodb.com/api/atlas/v2/groups/{PROJECT-ID}/logIntegrations?pretty=true" \
     --data '{
       "type": "OTEL_LOG_EXPORT",
       "logTypes": ["EVENTS"],
       "otelEndpoint": "https://otel-collector.example.com:4318/v1/logs",
       "otelSuppliedHeaders": [
         {
           "name": "Authorization",
           "value": "Bearer token123"
         }
       ]
     }'
