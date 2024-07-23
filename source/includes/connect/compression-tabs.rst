.. tabs::

   .. tab:: MongoClient
      :tabid: mongoclient

      .. code-block:: kotlin

         val settings = MongoClientSettings.builder()
             .applyConnectionString(ConnectionString("<connection string>"))
             .compressorList(
                 listOf(
                     MongoCompressor.createSnappyCompressor(),
                     MongoCompressor.createZlibCompressor(),
                     MongoCompressor.createZstdCompressor())
             )
             .build()

         val mongoClient = MongoClient.create(settings)

   .. tab:: Connection String
      :tabid: connectionstring

      .. code-block:: kotlin

         val uri = ConnectionString("mongodb+srv://<user>:<password>@<cluster-url>/?compressors=snappy,zlib,zstd")
         
         val mongoClient = MongoClient.create(uri)
