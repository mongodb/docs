.. option:: --mongo-authenticationMechanism <authMechanism>

   *Default*: SCRAM-SHA-1

   .. versionadded:: 2.3
   
   Specifies the authentication mechanism to use for schema discovery.
   Only available if :option:`--auth` is enabled. Use in conjunction with
   credential options :option:`--mongo-username` and
   :option:`--mongo-password`.
   
   .. include:: /includes/auth-mechanisms.rst
   

