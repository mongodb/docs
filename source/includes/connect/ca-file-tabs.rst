.. tabs::

   .. tab:: MongoDB\\Client
      :tabid: mongoclient

      .. code-block:: php

         $uri = 'mongodb://<hostname>:<port>';

         $options = [
            'tls' => true,
            'tlsCAFile' => '/path/to/ca.pem' 
         ];

         $client = new MongoDB\Client($uri, $options);

   .. tab:: Connection String
      :tabid: connectionstring

      .. code-block:: php

         $uri = 'mongodb://<hostname>:<port>/?tls=true&tlsCAFile=/path/to/ca.pem';
         $client = MongoDB\Client($uri);