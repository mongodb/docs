from pymongo import MongoClient

# define properties and MongoClient
properties = {"ENVIRONMENT": "gcp", "TOKEN_RESOURCE": "<audience>"}
client = MongoClient(
   "mongodb://<hostname>:<port>",
   username="<GCP identity client ID>",
   authMechanism="MONGODB-OIDC",
   authMechanismProperties=properties,
)