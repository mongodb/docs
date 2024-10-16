.. tabs::

   .. tab:: Connection String
      :tabid: connectionstring

      .. code-block:: c

         client = mongoc_client_new("mongodb://<db_username>:<db_password>@<hostname>/?compressors=zlib&zlibCompressionLevel=<zlib_compression_level");

   .. tab:: MongoC URI Options
      :tabid: mongocurioptions

      .. code-block:: c

         uri = mongoc_uri_new ("mongodb://localhost:27017");  
         mongoc_uri_set_option_as_int32 (uri, MONGOC_URI_ZLIBCOMPRESSIONLEVEL, <zlib-compression-level>);

         client = mongoc_client_new_from_uri (uri);