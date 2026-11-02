.. tabs::

   .. tab:: MongoDB\\Client
      :tabid: mongoclient

      .. code-block:: php

         $uri = 'mongodb://<hostname>:<port>';

         // Warning: Use the tlsAllowInvalidHostnames option only for testing. Don't use it in production.
         $options = [
            'tls' => true,
            'tlsAllowInvalidHostnames' => true,
         ];

         $client = new MongoDB\Client($uri, $options);

   .. tab:: Connection String
      :tabid: connectionstring

      .. code-block:: php

         // Warning: Use the tlsAllowInvalidHostnames option only for testing. Don't use it in production.
         $uri = 'mongodb://<hostname>:<port>/?tls=true&tlsAllowInvalidHostnames=true';
         $client = MongoDB\Client($uri);