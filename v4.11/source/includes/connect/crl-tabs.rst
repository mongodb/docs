.. tabs::

   .. tab:: MongoClient
      :tabid: mongoclient

      .. code-block:: python

         client = pymongo.MongoClient("mongodb://<db_username>:<db_password>@<hostname>:<port>",
                                      tls=True,
                                      tlsCRLFile="/path/to/crl.pem")

   .. tab:: Connection String
      :tabid: connectionstring

      .. code-block:: python

         uri = "mongodb://example.com/?tls=true&tlsCRLFile=/path/to/crl.pem"
         client = pymongo.MongoClient(uri)