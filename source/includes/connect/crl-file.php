$uri = 'mongodb://<hostname>:<port>';

$uriOptions = [
   'tls' => true,
];

$driverOptions = [
    'crl_file' => '/path/to/file.pem'
];

$client = new MongoDB\Client($uri, $uriOptions, $driverOptions);
