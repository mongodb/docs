from pymongo import MongoClient
from azure.identity import DefaultAzureCredential
from pymongo.auth_oidc import OIDCCallback, OIDCCallbackContext, OIDCCallbackResult
         
# define callback, properties, and MongoClient
audience = "<percent-encoded application or service that the OIDC access token is intended for>"
client_id = "<Azure identity client ID>"
class MyCallback(OIDCCallback):
    def fetch(self, context: OIDCCallbackContext) -> OIDCCallbackResult:
        credential = DefaultAzureCredential(managed_identity_client_id=client_id)
        token = credential.get_token(f"{audience}/.default").token
        return OIDCCallbackResult(access_token=token) 
properties = {"OIDC_CALLBACK": MyCallback()}
client = MongoClient(
   "mongodb://<hostname>:<port>",
   authMechanism="MONGODB-OIDC",
   authMechanismProperties=properties,
)