AZURE_TENANT_ID=08206ab8-16a0-406d-85e4-2f15f5620fac \
AZURE_APP_CLIENT_ID=b6c835da-e536-425b-9405-64bc471e245b \
AZURE_CLIENT_ID=f176d4eb-7dcd-4f66-bccf-aaa316ee61fd \
AZURE_FEDERATED_TOKEN_FILE=/var/run/secrets/azure/tokens/azure-identity-token \
./bin/mongosync \
      --logPath /var/log/mongosync \
      --cluster0 "mongodb://clusterOne01.fancyCorp.com:20020,clusterOne02.fancyCorp.com:20020,clusterOne03.fancyCorp.com:20020/?authMechanism=MONGODB-OIDC&authMechanismProperties=ENVIRONMENT:azure" \
      --cluster1 "mongodb://clusterTwo01.fancyCorp.com:20020,clusterTwo02.fancyCorp.com:20020,clusterTwo03.fancyCorp.com:20020/?authMechanism=MONGODB-OIDC&authMechanismProperties=ENVIRONMENT:azure"
