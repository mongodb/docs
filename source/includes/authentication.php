<?php

require __DIR__ . '/../vendor/autoload.php';

// start-default-client
$uriOptions = [
    'username' => '<username>',
    'password' => '<password>',
    'authSource' => '<authentication database>',
];

$client = new MongoDB\Client(
    'mongodb://<hostname>:<port>',
    $uriOptions,
);
// end-default-client

// start-default-uri
$uri = 'mongodb://<username>:<password>@<hostname>:<port>/?authSource=admin';
$client = new MongoDB\Client($uri);
// end-default-uri

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
    ['authMechanism' => 'MONGODB-AWS'],
);
// end-mongodb-aws-env-client

// start-mongodb-aws-env-uri
$uri = 'mongodb://<hostname>:<port>/?authMechanism=MONGODB-AWS';
$client = new MongoDB\Client($uri);
// end-mongodb-aws-env-uri

// Connects to a MongoDB deployment and enables TLS using client
// options
// start-enable-tls-client
$client = new MongoDB\Client(
    'mongodb://<hostname>:<port>/',
    ['tls' => true],
);
// end-enable-tls-client

// Connects to a MongoDB deployment and enables TLS using connection URI
// parameters
// start-enable-tls-uri
$uri = 'mongodb://<hostname>:<port>/?tls=true';
$client = new MongoDB\Client($uri);
// end-enable-tls-uri

// Connects to a MongoDB deployment, enables TLS, and specifies the path to
// a CA file using client options
// start-ca-file-client
$client = new MongoDB\Client(
    'mongodb://<hostname>:<port>/',
    ['tls' => true, 'tlsCAFile' => '/path/to/ca.pem'],
);
// end-ca-file-client

// Connects to a MongoDB deployment, enables TLS, and specifies the path to
// a CA file using connection URI parameters
// start-ca-file-uri
$uri = 'mongodb://<hostname>:<port>/?tls=true&tlsCAFile=/path/to/ca.pem';
$client = new MongoDB\Client($uri);
// end-ca-file-uri

// Connects to a MongoDB deployment, enables TLS, and prevents OCSP endpoint checks
// using client options
// start-disable-ocsp-client
$client = new MongoDB\Client(
    'mongodb://<hostname>:<port>/',
    ['tls' => true, 'tlsDisableOCSPEndpointCheck' => true],
);
// end-disable-ocsp-client

// Connects to a MongoDB deployment, enables TLS, and prevents OCSP endpoint checks
// using connection URI parameters
// start-disable-ocsp-uri
$uri = 'mongodb://<hostname>:<port>/?tls=true&tlsDisableOCSPEndpointCheck=true';
$client = new MongoDB\Client($uri);
// end-disable-ocsp-uri

// Connects to a TLS-enabled deployment and instructs the driver to check the
// server certificate against a CRL
// start-crl
$client = new MongoDB\Client(
    'mongodb://<hostname>:<port>/',
    ['tls' => true],
    ['crl_file' => '/path/to/file.pem'],
);
// end-crl

// Presents a client certificate to prove identity
// using client options
// start-client-cert-client
$client = new MongoDB\Client(
    'mongodb://<hostname>:<port>/',
    ['tls' => true, 'tlsCertificateKeyFile' => '/path/to/client.pem'],
);
// end-client-cert-client

//  Presents a client certificate to prove identity
// using connection URI parameters
// start-client-cert-uri
$uri = 'mongodb://<hostname>:<port>/?tls=true&tlsCertificateKeyFile=/path/to/client.pem';
$client = new MongoDB\Client($uri);
// end-client-cert-uri

// Specifies the password for a client certificate using client options
// start-key-file-client
$client = new MongoDB\Client(
    'mongodb://<hostname>:<port>/',
    [
        'tls' => true,
        'tlsCertificateKeyFile' => '/path/to/client.pem',
        'tlsCertificateKeyFilePassword' => '<password>',
    ],
);
// end-key-file-client

// Specifies the password for a client certificate using connection URI parameters
// start-key-file-uri
$uri = 'mongodb://<hostname>:<port>/?tls=true&tlsCertificateKeyFile=/path/to/client.pem&tlsCertificateKeyFilePassword=<password>';
$client = new MongoDB\Client($uri);
// end-key-file-uri

// Connects to a TLS-enabled deployment and disables server certificate verification
// using client options
// start-insecure-tls-client
$client = new MongoDB\Client(
    'mongodb://<hostname>:<port>/',
    ['tls' => true, 'tlsInsecure' => true],
);
// end-insecure-tls-client

// Connects to a TLS-enabled deployment and disables server certificate verification
// using connection URI parameters
// start-insecure-tls-uri
$uri = 'mongodb://<hostname>:<port>/?tls=true&tlsInsecure=true';
$client = new MongoDB\Client($uri);
// end-insecure-tls-uri

// Disables certificate validation using client options
// start-disable-cert-client
$client = new MongoDB\Client(
    'mongodb://<hostname>:<port>/',
    ['tls' => true, 'tlsAllowInvalidCertificates' => true],
);
// end-disable-cert-client

// Disables certificate validation using connection URI parameters
// start-disable-cert-uri
$uri = 'mongodb://<hostname>:<port>/?tls=true&tlsAllowInvalidCertificates=true';
$client = new MongoDB\Client($uri);
// end-disable-cert-uri

// Connects to a TLS-enabled deployment and disables hostname verification
// using client options
// start-disable-hostname-client
$client = new MongoDB\Client(
    'mongodb://<hostname>:<port>/',
    ['tls' => true, 'tlsAllowInvalidHostnames' => true],
);
// end-disable-hostname-client

// Connects to a TLS-enabled deployment and disables hostname verification
// using connection URI parameters
// start-disable-hostname-uri
$uri = 'mongodb://<hostname>:<port>/?tls=true&tlsAllowInvalidHostnames=true';
$client = new MongoDB\Client($uri);
// end-disable-hostname-uri
