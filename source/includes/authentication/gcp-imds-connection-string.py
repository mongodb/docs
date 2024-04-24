from pymongo import MongoClient

# define properties, URI, and MongoClient
properties = {"ENVIRONMENT": "gcp", "TOKEN_RESOURCE": "<audience>"}
uri = ("mongodb://<hostname>:<port>/?"
       "username=<GCP identity client ID>"
       "&authMechanism=MONGODB-OIDC"
       "&authMechanismProperties=properties")
client = MongoClient(uri)