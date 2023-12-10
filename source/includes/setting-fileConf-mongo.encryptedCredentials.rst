.. setting:: mongo.encryptedCredentials

   *Type*: boolean

   
   To use encrypted credentials in :setting:`mongo.mongoUri`, encrypt
   the credentials using the |onprem|
   :doc:`credentialstool </tutorial/encrypt-user-credentials>`, enter
   them in the :setting:`mongo.mongoUri` setting, and set this to
   ``true``:
   
   .. code-block:: ini
   
      mongo.encryptedCredentials=true
   
   

