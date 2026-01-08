from pymongo import AsyncMongoClient

# define URI and MongoClient
uri = ("mongodb[+srv]://<hostname>:<port>/?"
       "&authMechanism=MONGODB-OIDC"
       "&authMechanismProperties=ENVIRONMENT:gcp,TOKEN_RESOURCE:<percent-encoded audience>")
client = AsyncMongoClient(uri)