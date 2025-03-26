.. tabs::

   .. tab:: MongoClient
      :tabid: mongoclient

      .. code-block:: python

         client = pymongo.MongoClient("mongodb://<db_username>:<db_password>@<hostname>:<port>",
                                      tls=True,
                                      tlsDisableOCSPEndpointCheck=True)

   .. tab:: Connection String
      :tabid: connectionstring

      .. code-block:: python

         uri = "mongodb://example.com/?tls=true&tlsDisableOCSPEndpointCheck=true"
         client = pymongo.MongoClient(uri)
   
   .. tab:: MongoClient (Asynchronous)
      :tabid: mongoclient-async

      .. code-block:: python

         client = pymongo.AsyncMongoClient("mongodb://<db_username>:<db_password>@<hostname>:<port>",
                                           tls=True,
                                           tlsDisableOCSPEndpointCheck=True)
   
   .. tab:: Connection String (Asynchronous)
      :tabid: connectionstring-async

      .. code-block:: python

         uri = "mongodb://example.com/?tls=true&tlsDisableOCSPEndpointCheck=true"
         client = pymongo.AsyncMongoClient(uri)