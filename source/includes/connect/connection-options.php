<?php

// start-connection-uri
// Replace the placeholders with your actual hostname, port, and path to the certificate key file
$uri = 'mongodb://<hostname>:<port>/?tls=true&tlsCertificateKeyFile=/path/to/file.pem';

// Create a MongoDB client
$client = new MongoDB\Client($uri);
// end-connection-uri

// start-client-options
// Replace the placeholders with your actual hostname and port
$uri = 'mongodb://<hostname>:<port>/';

// Set the connection options
// Replace the placeholder with the actual path to the certificate key file
$uriOptions = [
    'tls' => true,
    'tlsCertificateKeyFile' => '/path/to/file.pem',
];

// Create a MongoDB client with the URI and options
$client = new Client($uri, $uriOptions);
// end-client-options
