from pymongo import AsyncMongoClient
from azure.identity import DefaultAzureCredential
from pymongo.auth_oidc import OIDCCallback, OIDCCallbackContext, OIDCCallbackResult
         
# define callback, properties, and MongoClient
audience = "<audience>"
client_id = "<Azure ID>"
class MyCallback(OIDCCallback):
    def fetch(self, context: OIDCCallbackContext) -> OIDCCallbackResult:
        credential = DefaultAzureCredential(managed_identity_client_id=client_id)
        token = credential.get_token(f"{audience}/.default").token
        return OIDCCallbackResult(access_token=token) 
properties = {"OIDC_CALLBACK": MyCallback()}
client = AsyncMongoClient(
   "mongodb[+srv]://<hostname>:<port>",
   authMechanism="MONGODB-OIDC",
   authMechanismProperties=properties
)