.. tabs::

   .. tab:: MongoClient
      :tabid: mongoclient

      .. code-block:: kotlin

         val settings = MongoClientSettings.builder()
             .applyConnectionString(ConnectionString("<connection string>"))
             .applyToSslSettings { builder ->
                 builder.enabled(true)
             }
             .build()
             
         val mongoClient = MongoClient.create(settings)


   .. tab:: Connection String
      :tabid: connectionstring

      .. code-block:: kotlin

         val uri = "mongodb+srv://<user>:<password>@<cluster-url>?tls=true"
         val mongoClient = MongoClient.create(uri)