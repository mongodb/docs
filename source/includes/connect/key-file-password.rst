.. tabs::

   .. tab:: MongoDB\\Client
      :tabid: mongoclient

      .. code-block:: php

         $uri = 'mongodb://<hostname>:<port>';

         $options = [
            'tls' => true,
            'tlsCertificateKeyFile' => '/path/to/client.pem',
            'tlsCertificateKeyFilePassword' => '<passphrase>'
         ];

         $client = new MongoDB\Client($uri, $options);

   .. tab:: Connection String
      :tabid: connectionstring

      .. code-block:: php

         $uri = 'mongodb://<hostname>:<port>/?tls=true&tlsCertificateKeyFile=/path/to/client.pem&tlsCertificateKeyFilePassword=<passphrase>';
         $client = MongoDB\Client($uri);