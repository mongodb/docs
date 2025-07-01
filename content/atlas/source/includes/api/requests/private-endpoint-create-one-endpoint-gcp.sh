curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --header "Accept: application/json" \
     --header "Content-Type: application/json" \
     --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/{GROUP-ID}/privateEndpoint/GCP/endpointService/{ENDPOINT-SERVICE-ID}/endpoint?pretty=true" \
     --data '
       {
         "endpointGroupName" : "google-endpoint-group",
         "gcpProjectId" : "p-dkfgoioogdksjei",
         "endpoints" : [
               {
                    "ipAddress" : "10.0.0.4",
                    "endpointName" : "google-endpoint-group-0"
               },
               {
                    "ipAddress" : "10.0.0.5",
                    "endpointName" : "google-endpoint-group-1"
               },
               {
                    "ipAddress" : "10.0.0.6",
                    "endpointName" : "google-endpoint-group-2"
               },
               {
                    "ipAddress" : "10.0.0.7",
                    "endpointName" : "google-endpoint-group-3"
               },
               {
                    "ipAddress" : "10.0.0.8",
                    "endpointName" : "google-endpoint-group-4"
               }
          ]
       }'
