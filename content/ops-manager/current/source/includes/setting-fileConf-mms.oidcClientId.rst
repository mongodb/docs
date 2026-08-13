.. setting:: mms.oidcClientId

   *Type*: string


   The client identifier that |onprem| presents to the |idp| when
   requesting an access token.

   Required when :setting:`mms.oidcMethod` is ``callback``. For the
   ``azure`` method, you can optionally set this to the client ID of
   a user-assigned managed identity; if you omit it, |onprem| uses
   the system-assigned managed identity. Not used for the ``gcp`` or
   ``k8s`` methods.

   .. code-block:: ini

      mongo.oidcClientId=ops-manager-appdb


