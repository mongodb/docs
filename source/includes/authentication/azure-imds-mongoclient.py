from pymongo import MongoClient

# define properties and MongoClient
properties = {"ENVIRONMENT": "azure", "TOKEN_RESOURCE": "<audience>"}
client = MongoClient(
    "mongodb://<hostname>:<port>",
    username="<Azure identity client ID>",
    authMechanism="MONGODB-OIDC",
    authMechanismProperties=properties,
)