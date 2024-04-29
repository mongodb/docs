from pymongo import MongoClient

# define URI and MongoClient
uri = ("mongodb://<hostname>:<port>/?"
       "username=<Azure client ID or application ID>"
       "&authMechanism=MONGODB-OIDC"
       "&authMechanismProperties=ENVIRONMENT:azure,TOKEN_RESOURCE:<percent-encoded audience>")
client = MongoClient(uri)