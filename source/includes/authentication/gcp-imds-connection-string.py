from pymongo import MongoClient

# define URI and MongoClient
uri = ("mongodb://<hostname>:<port>/?"
       "username=<GCP identity client ID>"
       "&authMechanism=MONGODB-OIDC"
       "&authMechanismProperties=ENVIRONMENT:gcp,TOKEN_RESOURCE:<audience>")
client = MongoClient(uri)