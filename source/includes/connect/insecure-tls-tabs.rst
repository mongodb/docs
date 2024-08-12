.. tabs::

   .. tab:: MongoClient
      :tabid: mongoclient

      .. code-block:: python

         client = pymongo.MongoClient("mongodb://<db_username>:<db_password>@<hostname:<port>",
                                      tls=True,
                                      tlsInsecure=True)

   .. tab:: Connection String
      :tabid: connectionstring

      .. code-block:: python

         uri = ("mongodb://<db_username>:<db_password>@<hostname>:<port>/?"
                "tls=true"
                "&tlsInsecure=true")
         client = pymongo.MongoClient(uri)