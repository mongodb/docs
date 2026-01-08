from pymongo import MongoClient

# define properties and MongoClient
properties = {"ENVIRONMENT": "azure", "TOKEN_RESOURCE": "<audience>"}
client = MongoClient(
    "mongodb[+srv]://<hostname>:<port>",
    username="<Azure ID>",
    authMechanism="MONGODB-OIDC",
    authMechanismProperties=properties
)