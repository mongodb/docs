.. tabs::

   .. tab:: MongoClient
      :tabid: mongoclient

      .. code-block:: python

         client = pymongo.MongoClient("mongodb://<username>:<password>@<hostname>:<port>",
                                      compressors = "snappy,zstd,zlib")

   .. tab:: Connection String
      :tabid: connectionstring

      .. code-block:: python

         uri = ("mongodb://<username>:<password>@<hostname>:<port>/?"
                "compressors=snappy,zstd,zlib")
         client = pymongo.MongoClient(uri)