.. setting:: mongo.mongoUri

   *Type*: string

   
   :manual:`connection string </reference/connection-string/>` used
   to access the |application| Database. If applicable, the connection
   string **must** include the authentication credentials for the
   :parameter:`authentication mechanism <authenticationMechanisms>`
   used on the |application| database.
   
   How you format your connection string depends on:
   
   - the type of cluster you deployed for your backing databases,
   - the protocol you use, and
   - the authentication method you use.
   
   .. composable-tutorial::
      :options: deployment-type, conn-string-type, auth-type
      :defaults: replica, standard, no-auth

      .. selected-content::
         :selections: replica, standard, no-auth

         .. include:: /includes/app-database-replica-standard-connection.rst
         
         .. code-block:: ini

            mongo.mongoUri=mongodb://mongos1.example.com:40000,mongos2.example.com:40000

      .. selected-content::
         :selections: replica, standard, challenge

         .. include:: /includes/app-database-replica-standard-connection.rst

         .. include:: /includes/tabsets/connstring/format-auth-scram.rst

         .. code-block:: ini

            mongo.mongoUri=mongodb://mongodbuser1:password@mongos1.example.com:40000,mongos2.example.com:40000

      .. include:: /includes/tabsets/connstring/fact-scram-roles.rst

      .. selected-content::
         :selections: replica, standard, x509

         .. include:: /includes/app-database-replica-standard-connection.rst
         
         .. include:: /includes/tabsets/connstring/format-auth-x509.rst

         .. code-block:: ini

            mongo.mongoUri=mongodb://<new_mongodb_user>@mongos1.example.com:40000,mongos2.example.com:40000/?authMechanism=MONGODB-X509


      .. selected-content::
         :selections: replica, standard, ldap

         .. include:: /includes/app-database-replica-standard-connection.rst

         .. include:: /includes/tabsets/connstring/format-auth-ldap.rst

         .. code-block:: ini

            mongo.mongoUri=mongodb://mongodbuser1:password@mongos1.example.com:40000,mongos2.example.com:40000/?authMechanism=PLAIN&authSource=$external

      .. selected-content::
         :selections: replica, standard, kerberos

         .. include:: /includes/app-database-replica-standard-connection.rst


         .. include:: /includes/tabsets/connstring/format-auth-kerberos.rst

         .. code-block:: ini

            mongo.mongoUri=mongodb://username%40REALM.EXAMPLE.COM@mongos1.example.com:40000,mongos2.example.com:40000/?authMechanism=GSSAPI

         .. include:: /includes/tabsets/connstring/fact-kerberos-settings.rst

      .. selected-content::
         :selections: replica, dns-list, no-auth

         .. include:: /includes/app-database-replica-dnslist-connection-.rst
         
         .. code-block:: ini

            mongo.mongoUri=mongodb+srv://db.example.com:40000


      .. selected-content::
         :selections: replica, dns-list, challenge

         .. include:: /includes/app-database-replica-dnslist-connection-.rst

         .. include:: /includes/tabsets/connstring/format-auth-scram.rst

         .. code-block:: ini

            mongo.mongoUri=mongodb+srv://mongodbuser1:password@mongod.example.com:40000

         .. include:: /includes/tabsets/connstring/fact-scram-roles.rst


      .. selected-content::
         :selections: replica, dns-list, x509
         
         .. include:: /includes/app-database-replica-dnslist-connection-.rst

         .. include:: /includes/tabsets/connstring/format-auth-x509.rst

         .. code-block:: ini

            mongo.mongoUri=mongodb+srv://<new_mongodb_user>@mongod.example.com:40000/?authMechanism=MONGODB-X509


      .. selected-content::
         :selections: replica, dns-list, ldap

         .. include:: /includes/app-database-replica-dnslist-connection-.rst
         
         .. include:: /includes/tabsets/connstring/format-auth-ldap.rst

         .. code-block:: ini

            mongo.mongoUri=mongodb+srv://mongodbuser1:password@mongod.example.com:40000/?authMechanism=PLAIN&authSource=$external

      .. selected-content::
         :selections: replica, dns-list, kerberos

         .. include:: /includes/app-database-replica-dnslist-connection-.rst

         .. include:: /includes/tabsets/connstring/format-auth-kerberos.rst

         .. code-block:: ini

            mongo.mongoUri=mongodb+srv://username%40REALM.EXAMPLE.COM@mongod.example.com:40000/?authMechanism=GSSAPI

         .. include:: /includes/tabsets/connstring/fact-kerberos-settings.rst



      .. selected-content::
         :selections: sharded, standard, no-auth

         .. include:: /includes/app-database-sharded-standard-connection.rst

         .. code-block:: ini

            mongo.mongoUri=mongodb://mongos1.example.com:40000,mongos2.example.com:40000

      .. selected-content::
         :selections: sharded, standard, challenge

         .. include:: /includes/app-database-sharded-standard-connection.rst

         
         .. include:: /includes/tabsets/connstring/format-auth-scram.rst

         .. code-block:: ini

            mongo.mongoUri=mongodb://mongodbuser1:password@mongos1.example.com:40000,mongos2.example.com:40000

         .. include:: /includes/tabsets/connstring/fact-scram-roles.rst


      .. selected-content::
         :selections: sharded, standard, x509

         .. include:: /includes/app-database-sharded-standard-connection.rst

         .. include:: /includes/tabsets/connstring/format-auth-x509.rst

         .. code-block:: ini

            mongo.mongoUri=mongodb://<new_mongodb_user>@mongos1.example.com:40000,mongos2.example.com:40000/?authMechanism=MONGODB-X509


      .. selected-content::
         :selections: sharded, standard, ldap

         .. include:: /includes/app-database-sharded-standard-connection.rst

         .. include:: /includes/tabsets/connstring/format-auth-ldap.rst

         .. code-block:: ini

            mongo.mongoUri=mongodb://mongodbuser1:password@mongos1.example.com:40000,mongos2.example.com:40000/?authMechanism=PLAIN&authSource=$external


      .. selected-content::
         :selections: sharded, standard, kerberos

         .. include:: /includes/app-database-sharded-standard-connection.rst

         .. include:: /includes/tabsets/connstring/format-auth-kerberos.rst

         .. code-block:: ini

            mongo.mongoUri=mongodb://username%40REALM.EXAMPLE.COM@mongos1.example.com:40000,mongos2.example.com:40000/?authMechanism=GSSAPI

         .. include:: /includes/tabsets/connstring/fact-kerberos-settings.rst


      .. selected-content::
         :selections: sharded, dns-list, no-auth

         .. include:: /includes/app-database-sharded-dnslist-connection.rst

         .. code-block:: ini

            mongo.mongoUri=mongodb+srv://db.example.com:40000

      .. selected-content::
         :selections: sharded, dns-list, challenge

         .. include:: /includes/app-database-sharded-dnslist-connection.rst

         .. include:: /includes/tabsets/connstring/format-auth-scram.rst

         .. code-block:: ini

            mongo.mongoUri=mongodb+srv://mongodbuser1:password@mongos.example.com:40000

         .. include:: /includes/tabsets/connstring/fact-scram-roles.rst

      .. selected-content::
         :selections: sharded, dns-list, x509

         .. include:: /includes/app-database-sharded-dnslist-connection.rst

         .. include:: /includes/tabsets/connstring/format-auth-x509.rst

         .. code-block:: ini

            mongo.mongoUri=mongodb+srv://<new_mongodb_user>@mongos.example.com:40000/?authMechanism=MONGODB-X509


      .. selected-content::
         :selections: sharded, dns-list, ldap

         .. include:: /includes/app-database-sharded-dnslist-connection.rst
         
         .. include:: /includes/tabsets/connstring/format-auth-ldap.rst

         .. code-block:: ini

            mongo.mongoUri=mongodb+srv://mongodbuser1:password@mongos.example.com:40000/?authMechanism=PLAIN&authSource=$external


      .. selected-content::
         :selections: sharded, dns-list, kerberos

         .. include:: /includes/app-database-sharded-dnslist-connection.rst
         
         .. include:: /includes/tabsets/connstring/format-auth-kerberos.rst

         .. code-block:: ini

            mongo.mongoUri=mongodb+srv://username%40REALM.EXAMPLE.COM@mongos.example.com:40000/?authMechanism=GSSAPI

         .. include:: /includes/tabsets/connstring/fact-kerberos-settings.rst

   
   

