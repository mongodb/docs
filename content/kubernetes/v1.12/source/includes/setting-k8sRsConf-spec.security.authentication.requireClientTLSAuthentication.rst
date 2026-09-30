.. setting:: spec.security.authentication.requireClientTLSAuthentication

   *Type*: boolean

   *Default*: ``false``

   
   Specifies whether the MongoDB host requires clients to connect using a
   |tls| certificate. Defaults to ``true`` if you enable |tls|
   authentication.
   
   To enable |tls| authentication, provide a value for the :setting:`spec.security.certsSecretPrefix` setting.
   

