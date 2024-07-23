.. tabs::

   .. tab:: MongoClient
      :tabid: mongoclient

      .. code-block:: kotlin

         val settings = MongoClientSettings.builder()
             .applyConnectionString(ConnectionString("<connection string>"))
             .applyToSslSettings { builder ->
                 builder.enabled(true)
                 builder.invalidHostNameAllowed(true)
             }
             .build()
         val mongoClient = MongoClient.create(settings);


   .. tab:: Connection String
      :tabid: connectionstring

      .. code-block:: kotlin

         val uri = "mongodb://<username>:<password>@<hostname>:<port>/?"tls=true&tlsAllowInvalidHostnames=true"
         val mongoClient = MongoClient.create(uri)