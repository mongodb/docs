<?php

require __DIR__ . '/../vendor/autoload.php';

// start-scram-sha-256-client
$uriOptions = [
    'username' => '<username>',
    'password' => '<password>',
    'authSource' => '<authentication database>',
    'authMechanism' => 'SCRAM-SHA-256',
];

$client = new MongoDB\Client(
    'mongodb://<hostname>:<port>',
    $uriOptions,
);
// end-scram-sha-256-client

// start-scram-sha-256-uri
$uri = 'mongodb://<username>:<password>@<hostname>:<port>/?authSource=admin&authMechanism=SCRAM-SHA-256';
$client = new MongoDB\Client($uri);
// end-scram-sha-256-uri

// start-scram-sha-1-client
$uriOptions = [
    'username' => '<username>',
    'password' => '<password>',
    'authSource' => '<authentication database>',
    'authMechanism' => 'SCRAM-SHA-1',
];

$client = new MongoDB\Client(
    'mongodb://<hostname>:<port>',
    $uriOptions,
);
// end-scram-sha-1-client

// start-scram-sha-1-uri
$uri = 'mongodb://<username>:<password>@<hostname>:<port>/?authSource=admin&authMechanism=SCRAM-SHA-1';
$client = new MongoDB\Client($uri);
// end-scram-sha-1-uri

// start-mongodb-X509-client
$uriOptions = [
    'tls' => true,
    'tlsCertificateKeyFile' => '<file path>',
    'authMechanism' => 'MONGODB-X509',
];

$client = new MongoDB\Client(
    'mongodb://<hostname>:<port>',
    $uriOptions,
);
// end-mongodb-X509-client

// start-mongodb-X509-uri
$uri = 'mongodb://<hostname>:<port>/?tls=true&tlsCertificateKeyFile=<file path>&authMechanism=MONGODB-X509';
$client = new MongoDB\Client($uri);
// end-mongodb-X509-uri

// start-mongodb-aws-client
$uriOptions = [
    'username' => '<AWS IAM access key ID>',
    'password' => '<AWS IAM secret access key>',
    'authMechanism' => 'MONGODB-AWS',
];

$client = new MongoDB\Client(
    'mongodb://<hostname>:<port>',
    $uriOptions,
);
// end-mongodb-aws-client

// start-mongodb-aws-uri
$uri = 'mongodb://<AWS IAM access key ID>:<AWS IAM secret access key>@<hostname>:<port>/?authMechanism=MONGODB-AWS';
$client = new MongoDB\Client($uri);
// end-mongodb-aws-uri

// start-mongodb-aws-env-client
$client = new MongoDB\Client(
    'mongodb://<hostname>:<port>',
    ['authMechanism' => 'MONGODB-AWS']
);
// end-mongodb-aws-env-client

// start-mongodb-aws-env-uri
$uri = 'mongodb://<hostname>:<port>/?authMechanism=MONGODB-AWS';
$client = new MongoDB\Client($uri);
// end-mongodb-aws-env-uri
