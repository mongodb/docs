from pymongo import MongoClient

# define URI and MongoClient
uri = ("mongodb[+srv]://<hostname>:<port>/?"
       "&authMechanism=MONGODB-OIDC"
       "&authMechanismProperties=ENVIRONMENT:gcp,TOKEN_RESOURCE:<percent-encoded audience>")
client = MongoClient(uri)