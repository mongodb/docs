<?php

// start-enable-client
$client = new MongoDB\Client(
    'mongodb://<hostname>:<port>',
    ['compressors' => 'snappy,zstd,zlib'],
);
// end-enable-client

// start-enable-uri
$uri = 'mongodb://<hostname>:<port>/?compressors=snappy,zstd,zlib';
$client = new MongoDB\Client($uri);
// end-enable-uri

// start-set-level-client
$uriOptions = [
    'compressors'  => 'zlib',
    'zlibCompressionLevel' => 1,
];

$client = new MongoDB\Client(
    'mongodb://<hostname>:<port>',
    $uriOptions,
);
// end-set-level-client

// start-set-level-uri
$uri = 'mongodb://<hostname>:<port>/?compressors=zlib&zlibCompressionLevel=1';
$client = new MongoDB\Client($uri);
// end-set-level-uri
