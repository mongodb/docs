from pymongo import AsyncMongoClient

# define URI and MongoClient
uri = ("mongodb[+srv]://<hostname>:<port>/?"
       "username=<username>"
       "&authMechanism=MONGODB-OIDC"
       "&authMechanismProperties=ENVIRONMENT:azure,TOKEN_RESOURCE:<percent-encoded audience>")
client = AsyncMongoClient(uri)