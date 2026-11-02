.. tabs::

   .. tab:: MongoDB\\Client
      :tabid: mongoclient

      .. code-block:: php

         $uri = 'mongodb://<hostname>:<port>';

         // Warning: Use the tlsAllowInvalidCertificates option only for testing. Don't use it in production.
         $options = [
            'tls' => true,
            'tlsAllowInvalidCertificates' => true,
         ];

         $client = new MongoDB\Client($uri, $options);

   .. tab:: Connection String
      :tabid: connectionstring

      .. code-block:: php

         // Warning: Use the tlsAllowInvalidCertificates option only for testing. Don't use it in production.
         $uri = 'mongodb://<hostname>:<port>/?tls=true&tlsAllowInvalidCertificates=true';
         $client = MongoDB\Client($uri);