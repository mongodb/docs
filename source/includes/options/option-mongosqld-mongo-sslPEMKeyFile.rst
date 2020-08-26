.. option:: --mongo-sslPEMKeyFile <filename>

   Specifies the :file:`.pem` file containing both the TLS/SSL
   certificate and key for :binary:`~bin.mongosqld` to use when
   connecting to MongoDB. You can specify the file name of the
   :file:`.pem` file using either using a relative or absolute
   path.
   
   This option is required when using the :option:`--mongo-ssl` option to
   connect to a :binary:`~bin.mongod` or :binary:`~bin.mongos` that has
   :setting:`~net.ssl.CAFile` enabled *without*
   :setting:`~net.ssl.allowConnectionsWithoutCertificates`.

