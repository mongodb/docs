from pymongo import MongoClient, AsyncMongoClient

# start-kubernetes-connection-string
uri = ("mongodb[+srv]://<hostname>:<port>/?"
       "authMechanism=MONGODB-OIDC"
       "&authMechanismProperties=ENVIRONMENT:k8s")
client = MongoClient(uri)
# end-kubernetes-connection-string

# start-kubernetes-connection-string-async
uri = ("mongodb[+srv]://<hostname>:<port>/?"
       "authMechanism=MONGODB-OIDC"
       "&authMechanismProperties=ENVIRONMENT:k8s")
client = AsyncMongoClient(uri)
# end-kubernetes-connection-string-async