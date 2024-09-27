<?php

$uri = 'mongodb://host1:27017/?replicaSet=sampleRS';

// Create a MongoDB client
$client = new MongoDB\Client($uri);