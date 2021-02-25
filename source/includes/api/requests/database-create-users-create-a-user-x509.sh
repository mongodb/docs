curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --header "Accept: application/json" \
     --header "Content-Type: application/json" \
     --include \
     --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/{GROUP-ID}/databaseUsers" \
     --data '
       {
         "databaseName": "$external",
         "x509Type": "CUSTOMER",
         "roles": [{
           "databaseName": "sales",
           "roleName": "readWrite"
         }, {
           "databaseName": "marketing",
           "roleName": "read"
         }],
         "scopes": [{
           "name": "myCluster", 
           "type": "CLUSTER"
         }],
         "username": "CN=david@example.com,OU=users,DC=example,DC=com"
       }'
