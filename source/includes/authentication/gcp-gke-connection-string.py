from pymongo import MongoClient
from pymongo.auth_oidc import OIDCCallback, OIDCCallbackContext, OIDCCallbackResult

# define callback, properties, URI, and MongoClient
class MyCallback(OIDCCallback):
    def fetch(self, context: OIDCCallbackContext) -> OIDCCallbackResult:
        with open("/var/run/secrets/kubernetes.io/serviceaccount/token") as fid:
            token = fid.read()
        return OIDCCallbackResult(access_token=token)
properties = {"OIDC_CALLBACK": MyCallback()}
uri = ("mongodb://<hostname>:<port>/?"
       "&authMechanism=MONGODB-OIDC"
       "&authMechanismProperties=properties")
client = MongoClient(uri)