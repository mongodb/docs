.. setting:: mms.oidcEnabled

   *Type*: boolean

   *Default*: false


   Enables |oidc| authentication from |onprem| and the Backup Daemon
   to the |application| Database. |oidc| authentication is available
   in addition to existing authentication mechanisms; enabling it
   does not disable other configured mechanisms.

   .. code-block:: ini

      mongo.oidcEnabled=true


