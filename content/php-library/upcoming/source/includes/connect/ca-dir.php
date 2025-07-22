<?php

$uri = 'mongodb://<hostname>:<port>';

$uriOptions = ['tls' => true];
$driverOptions = ['ca_dir' => '/path/to/search/'];

$client = new MongoDB\Client($uri, $uriOptions, $driverOptions);
