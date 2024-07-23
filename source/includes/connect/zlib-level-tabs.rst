.. tabs::

   .. tab:: MongoClient
      :tabid: mongoclient

      .. code-block:: kotlin

         val zlib = MongoCompressor.createZlibCompressor()

         val settings = MongoClientSettings.builder()
             .applyConnectionString(ConnectionString(uri))
             .compressorList(listOf(zlib.withProperty(MongoCompressor.LEVEL, <level>)))
             .build()

         val mongoClient = MongoClient.create(settings)

   .. tab:: Connection String
      :tabid: connectionstring

      .. code-block:: kotlin

         val uri = "mongodb://<username>:<password>@<hostname>:<port>/?" +
                   "compressors=zlib" +
                   "zlibCompressionLevel=<zlib compression level>"
         
         val mongoClient = MongoClient.create(uri)