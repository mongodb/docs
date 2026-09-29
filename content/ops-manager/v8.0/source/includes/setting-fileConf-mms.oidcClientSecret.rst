.. setting:: mms.oidcClientSecret

   *Type*: string


   The client secret that |onprem| presents to the |idp| when
   requesting an access token.

   Required when :setting:`mms.oidcMethod` is ``callback``. Not used
   for the ``azure``, ``gcp``, or ``k8s`` methods, since those methods
   do not require a client secret.

   .. code-block:: ini

      mongo.oidcClientSecret=<client-secret>


