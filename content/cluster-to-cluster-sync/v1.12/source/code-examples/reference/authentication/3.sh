./bin/mongosync \
      --logPath /var/log/mongosync \
      --cluster0 "mongodb://clusterOne01.fancyCorp.com:20020,clusterOne02.fancyCorp.com:20020,clusterOne03.fancyCorp.com:20020/?authMechanism=MONGODB-OIDC&authMechanismProperties=ENVIRONMENT:gcp,TOKEN_RESOURCE:https://www.example.com" \
      --cluster1 "mongodb://clusterTwo01.fancyCorp.com:20020,clusterTwo02.fancyCorp.com:20020,clusterTwo03.fancyCorp.com:20020/?authMechanism=MONGODB-OIDC&authMechanismProperties=ENVIRONMENT:gcp,TOKEN_RESOURCE:https://www.example.com"
