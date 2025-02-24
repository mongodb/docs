from pymongo import MongoClient

# start-kubernetes-connection-string
uri = ("mongodb[+srv]://<hostname>:<port>/?"
       "authMechanism=MONGODB-OIDC"
       "&authMechanismProperties=ENVIRONMENT:k8s")
client = MongoClient(uri)
# end-kubernetes-connection-string