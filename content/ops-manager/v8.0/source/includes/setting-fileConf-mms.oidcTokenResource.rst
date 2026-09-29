.. setting:: mms.oidcTokenResource

   *Type*: string


   The audience or resource identifier that |onprem| requests when
   acquiring a workload identity token from the environment. This
   value must match the ``audience`` configured for this |idp| in
   the target MongoDB deployment's ``oidcIdentityProviders``
   setting.

   Required when :setting:`mms.oidcMethod` is ``azure`` or ``gcp``.
   Not used for the ``callback`` or ``k8s`` methods.

   .. code-block:: ini

      mongo.oidcTokenResource=https://my-mongodb-audience


