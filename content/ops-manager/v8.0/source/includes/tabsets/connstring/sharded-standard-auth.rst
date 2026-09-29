.. tabs::

   .. tab:: None
      :tabid: none

      .. code-block:: ini

         mongo.mongoUri=mongodb://mongos1.example.com:40000,mongos2.example.com:40000

   .. tab:: Challenge/Response
      :tabid: scram

      .. include:: /includes/tabsets/connstring/format-auth-scram.rst

      .. code-block:: ini

         mongo.mongoUri=mongodb://mongodbuser1:password@mongos1.example.com:40000,mongos2.example.com:40000

      .. include:: /includes/tabsets/connstring/fact-scram-roles.rst

   .. tab:: x.509 Certificate
      :tabid: x509

      .. include:: /includes/tabsets/connstring/format-auth-x509.rst

      .. code-block:: ini

         mongo.mongoUri=mongodb://<new_mongodb_user>@mongos1.example.com:40000,mongos2.example.com:40000/?authMechanism=MONGODB-X509

   .. tab:: LDAP
      :tabid: ldap

      .. include:: /includes/tabsets/connstring/format-auth-ldap.rst

      .. code-block:: ini

         mongo.mongoUri=mongodb://mongodbuser1:password@mongos1.example.com:40000,mongos2.example.com:40000/?authMechanism=PLAIN&authSource=$external

   .. tab:: Kerberos
      :tabid: kerberos

      .. include:: /includes/tabsets/connstring/format-auth-kerberos.rst

      .. code-block:: ini

         mongo.mongoUri=mongodb://username%40REALM.EXAMPLE.COM@mongos1.example.com:40000,mongos2.example.com:40000/?authMechanism=GSSAPI

      .. include:: /includes/tabsets/connstring/fact-kerberos-settings.rst

