<?php

require 'vendor/autoload.php';

// Connects to a local MongoDB deployment
// start-local
$uri = 'mongodb://localhost:27017/';
$client = new MongoDB\Client($uri);
// end-local

// Connects to a MongoDB Atlas deployment
// start-atlas
$uri = '<Atlas connection string>';
$client = new MongoDB\Client($uri);
// end-atlas

// Connects to a replica set using client options
// start-replica-set-client
$client = new MongoDB\Client(
    'mongodb://<replica set member>:<port>/',
    ['replicaSet' => '<replica set name>'],
);
// end-replica-set-client

// Connects to a replica set using a connection URI parameter
// start-replica-set-uri
$uri = 'mongodb://<replica set member>:<port>/?replicaSet=<replica set name>';
$client = new MongoDB\Client($uri);
// end-replica-set-uri

// Connects to a MongoDB deployment and enables the stable API
// start-stable-api
$driverOptions = ['serverApi' => new MongoDB\Driver\ServerApi('1')];
$client = new MongoDB\Client(
    'mongodb://<hostname>:<port>/',
    [],
    $driverOptions,
);
// end-stable-api

// Connects to a MongoDB deployment and compresses network traffic
// using client options
// start-compression-client
$client = new MongoDB\Client(
    'mongodb://<hostname>:<port>',
    ['compressors' => 'snappy,zstd,zlib'],
);
// end-compression-client

// Connects to a MongoDB deployment and compresses network traffic
// using connection URI parameters
// start-compression-uri
$uri = 'mongodb://<hostname>:<port>/?compressors=snappy,zstd,zlib';
$client = new MongoDB\Client($uri);
// end-compression-uri
