The following tabs demonstrate how to specify all available compressors while connecting to MongoDB:

.. tabs::

   .. tab:: MongoClient
      :tabid: mongoclient

      .. code-block:: python

         client = pymongo.MongoClient("mongodb://<db_username>:<db_password>@<hostname>:<port>",
                                      compressors = "snappy,zstd,zlib")

   .. tab:: Connection String
      :tabid: connectionstring

      .. code-block:: python

         uri = ("mongodb://<db_username>:<db_password>@<hostname>:<port>/?"
                "compressors=snappy,zstd,zlib")
         client = pymongo.MongoClient(uri)
   
   .. tab:: MongoClient (Asynchronous)
      :tabid: mongoclient-async

      .. code-block:: python

         client = pymongo.AsyncMongoClient("mongodb://<db_username>:<db_password>@<hostname>:<port>",
                                           compressors = "snappy,zstd,zlib")
   
   .. tab:: Connection String (Asynchronous)
      :tabid: connectionstring-async

      .. code-block:: python

         uri = ("mongodb://<db_username>:<db_password>@<hostname>:<port>/?"
                "compressors=snappy,zstd,zlib")
         client = pymongo.AsyncMongoClient(uri)