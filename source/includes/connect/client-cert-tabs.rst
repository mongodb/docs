.. tabs::

   .. tab:: MongoClient
      :tabid: mongoclient

      .. code-block:: python

         client = pymongo.MongoClient("mongodb://<db_username>:<db_password>@<hostname>:<port>",
                                      tls=True,
                                      tlsCertificateKeyFile='/path/to/client.pem')

   .. tab:: Connection String
      :tabid: connectionstring

      .. code-block:: python

         uri = ("mongodb://<db_username>:<db_password>@<hostname:<port>/?"
                "tls=true"
                "&tlsCertificateKeyFile=path/to/client.pem")
         client = pymongo.MongoClient(uri)
   
   .. tab:: MongoClient (Asynchronous)
      :tabid: mongoclient-async

      .. code-block:: python

         client = pymongo.AsyncMongoClient("mongodb://<db_username>:<db_password>@<hostname>:<port>",
                                           tls=True,
                                           tlsCertificateKeyFile='/path/to/client.pem')
   
   .. tab:: Connection String (Asynchronous)
      :tabid: connectionstring-async

      .. code-block:: python

         uri = ("mongodb://<db_username>:<db_password>@<hostname>:<port>/?"
                "tls=true"
                "&tlsCertificateKeyFile=path/to/client.pem")
         client = pymongo.AsyncMongoClient(uri)