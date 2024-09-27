.. tabs::

   .. tab:: MongoDB\\Client
      :tabid: mongoclient

      .. code-block:: php

         $uri = 'mongodb://<hostname>:<port>';

         $options = [
            'tls' => true,
            'tlsCRLFile' => '/path/to/crl.pem' 
         ];

         $client = new MongoDB\Client($uri, $options);

   .. tab:: Connection String
      :tabid: connectionstring

      .. code-block:: php

         $uri = 'mongodb://<hostname>:<port>/?tls=true&tlsCRLFile=/path/to/crl.pem';
         $client = MongoDB\Client($uri);