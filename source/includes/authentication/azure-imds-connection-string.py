from pymongo import MongoClient

# define properties, URI, and MongoClient
properties = {"ENVIRONMENT": "azure", "TOKEN_RESOURCE": "<audience>"}
uri = ("mongodb://<hostname>:<port>/?"
       "username=<Azure identity client ID>"
       "&authMechanism=MONGODB-OIDC"
       "&authMechanismProperties=properties")
client = MongoClient(uri)