curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --header "Accept: application/json" \
     --header "Content-Type: application/json" \
     --include \
     --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/{GROUP-ID}/databaseUsers" \
     --data '
       {
         "databaseName": "admin",
         "ldapAuthType": "GROUP",
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
         "username": "CN=marketing,OU=groups,DC=example,DC=com"
       }'
