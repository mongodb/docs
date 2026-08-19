.. setting:: mms.oidcTokenUri

   *Type*: string


   The token endpoint URL of the |idp|. |onprem| uses this endpoint
   to request access tokens using the client credentials flow.

   Required when :setting:`mms.oidcMethod` is ``callback``. Not used
   for the ``azure``, ``gcp``, or ``k8s`` methods.

   .. code-block:: ini

      mongo.oidcTokenUri=https://idp.example.com/realms/prod/protocol/openid-connect/token


