from pymongo import AsyncMongoClient

# define properties and MongoClient
properties = {"ENVIRONMENT": "azure", "TOKEN_RESOURCE": "<audience>"}
client = AsyncMongoClient(
    "mongodb[+srv]://<hostname>:<port>",
    username="<Azure ID>",
    authMechanism="MONGODB-OIDC",
    authMechanismProperties=properties
)