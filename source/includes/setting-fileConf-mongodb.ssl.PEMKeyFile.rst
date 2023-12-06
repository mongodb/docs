.. setting:: mongodb.ssl.PEMKeyFile

   *Type*: string

   
   Name of the PEM file that contains the X509 certificate and
   private key. Required if the MongoDB instance is running with the
   :option:`--tlsCAFile <mongod.--tlsCAFile>` option or
   :setting:`net.tls.CAFile` setting.
   
   If you authenticate using the ``MONGODB-X509`` authentication
   mechanism, you also enter this as the name of the user in the
   :setting:`mongoUri` connection string.
   
   

