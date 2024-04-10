.. tabs::

   .. tab:: MongoClient
      :tabid: mongoclient

      .. code-block:: python

         client = pymongo.MongoClient("mongodb://<username>:<password>@<hostname>:<port>",
                                      tls=True,
                                      tlsCAFile="/path/to/ca.pem")

   .. tab:: Connection String
      :tabid: connectionstring

      .. code-block:: python

         uri = "mongodb://example.com/?tls=true&tlsCAFile=/path/to/ca.pem"
         client = pymongo.MongoClient(uri)