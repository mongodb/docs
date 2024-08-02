.. tabs::

   .. tab:: mongocxx::options::tls
      :tabid: tlsoptions

      .. code-block:: cpp

         mongocxx::options::client client_options;
         mongocxx::options::tls tls_options;

         tls_options.allow_invalid_certificates(true);
         client_options.tls_opts(tls_options);

         mongocxx::uri uri("mongodb://<hostname>:<port>/?tls=true");
         mongocxx::client client(uri, client_options);

   .. tab:: Connection String
      :tabid: connectionstring

      .. code-block:: cpp

         mongocxx::uri uri("mongodb://<hostname>:<port>/?tls=true&tlsAllowInvalidCertificates=true");