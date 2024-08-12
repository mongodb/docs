.. tabs::

   .. tab:: MongoClient
      :tabid: mongoclient

      .. code-block:: python

         client = pymongo.MongoClient("mongodb://<db_username>:<db_password>@<hostname>:<port>",
                                      tls=True,
                                      tlsCAFile="/path/to/ca.pem")

   .. tab:: Connection String
      :tabid: connectionstring

      .. code-block:: python

         uri = "mongodb://<db_username>:<db_password>@<hostname>:<port>/?tls=true&tlsCAFile=/path/to/ca.pem"
         client = pymongo.MongoClient(uri)