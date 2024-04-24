from pymongo import MongoClient

# define URI and MongoClient
uri = ("mongodb://<hostname>:<port>/?"
       "username=<Azure identity client ID>"
       "&authMechanism=MONGODB-OIDC"
       "&authMechanismProperties=ENVIRONMENT:azure,TOKEN_RESOURCE:<audience>")
client = MongoClient(uri)