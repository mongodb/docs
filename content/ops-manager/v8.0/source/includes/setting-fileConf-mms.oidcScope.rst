.. setting:: mms.oidcScope

   *Type*: string


   The OAuth2 scope that |onprem| requests from the |idp| when
   acquiring an access token using the client credentials flow.

   Used only when :setting:`mms.oidcMethod` is ``callback``. Not used
   for the ``azure``, ``gcp``, or ``k8s`` methods.

   .. code-block:: ini

      mongo.oidcScope=openid


