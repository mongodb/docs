.. setting:: mms.kerberos.principal

   *Type*: string

   
   Required if using Kerberos. Principal used to authenticate with
   MongoDB. This should be the exact same user on the
   :setting:`mongo.mongoUri`.
   
   .. code-block:: ini
   
      mms.kerberos.principal=mms/mmsweb.example.com@EXAMPLE.COM
   
   

