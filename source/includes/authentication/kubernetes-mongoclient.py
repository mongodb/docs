from pymongo import MongoClient, AsyncMongoClient

# start-kubernetes-mongoclient
properties = {"ENVIRONMENT": "k8s"}
client = MongoClient(
    "mongodb[+srv]://<hostname>:<port>",
    authMechanism="MONGODB-OIDC",
    authMechanismProperties=properties
)
# end-kubernetes-mongoclient

# start-kubernetes-mongoclient-async
properties = {"ENVIRONMENT": "k8s"}
client = AsyncMongoClient(
    "mongodb[+srv]://<hostname>:<port>",
    authMechanism="MONGODB-OIDC",
    authMechanismProperties=properties
)
# end-kubernetes-mongoclient-async