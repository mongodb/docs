<?php

// start-specify-v1
$uri = 'mongodb://<hostname>:<port>';

$driverOptions = ['serverApi' => new MongoDB\Driver\ServerApi('1')];

$client = new MongoDB\Client($uri, [], $driverOptions);
// end-specify-v1

// start-stable-api-options
$uri = 'mongodb://<hostname>:<port>';

$serverApi = new MongoDB\Driver\ServerApi('1', strict: true, deprecationErrors: true);
$driverOptions = ['serverApi' => $serverApi];

$client = new MongoDB\Client($uri, [], $driverOptions);
// end-stable-api-options
