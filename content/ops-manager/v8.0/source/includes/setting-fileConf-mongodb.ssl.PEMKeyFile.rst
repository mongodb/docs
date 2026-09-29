.. setting:: mongodb.ssl.PEMKeyFile

   *Type*: string

   
   Name of the PEM file that contains the X509 certificate and
   private key. Required if the MongoDB instance is running with the
   :option:`--tlsCAFile <mongod.--tlsCAFile>` option or
   :setting:`net.tls.CAFile` setting.
   
   The ``Extended Key Usage`` field of that certificate should include ``TLS Web client authentication``.
   
   If you authenticate using the ``MONGODB-X509`` authentication
   mechanism, you also enter this as the name of the user in the
   ``mongoUri`` connection string.
   
   

