<?php

require __DIR__ . '/../vendor/autoload.php';

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your Atlas URI that connects to the sample dataset');
$client = new MongoDB\Client($uri);

$collection = $client->getCollection('<database>', '<collection>');

// Start example code here

// End example code here
