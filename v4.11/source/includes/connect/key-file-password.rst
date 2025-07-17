.. tabs::

   .. tab:: MongoClient
      :tabid: mongoclient

      .. code-block:: python

         client = pymongo.MongoClient("mongodb://<db_username>:<db_password>@<hostname:<port>",
                                tls=True,
                                tlsCertificateKeyFile='/path/to/client.pem',
                                tlsCertificateKeyFilePassword=<passphrase>)

   .. tab:: Connection String
      :tabid: connectionstring

      .. code-block:: python

         uri = ("mongodb://<db_username>:<db_password>@<hostname:<port>/?"
                "tls=true"
                "&tlsCertificateKeyFile=path/to/client.pem"
                "&tlsCertificateKeyFilePassword=<passphrase>")
         client = pymongo.MongoClient(uri)