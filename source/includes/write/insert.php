<?php

require 'vendor/autoload.php';

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your Atlas URI that connects to the sample dataset');
$client = new MongoDB\Client($uri);

// start-db-coll
$collection = $client->sample_restaurants->restaurants;
// end-db-coll

// Inserts a document that stores a "name" value of "Mongo's Burgers" into the collection
// start-insert-one
$result = $collection->insertOne(['name' => 'Mongo\'s Burgers']);
// end-insert-one

// Inserts documents representing restaurants into the collection
// start-insert-many
$restaurants = [
    ['name' => 'Mongo\'s Burgers'],
    ['name' => 'Mongo\'s Pizza']
];

$result = $collection->insertMany($restaurants);
// end-insert-many

// Inserts multiple documents and instructs the insert operation to skip document-level validation
// start-modify
$docs = [
    ['name' => 'Mongo\'s Burgers'],
    ['name' => 'Mongo\'s Pizza'],
    ['name' => 'Mongo\'s Tacos']
];

$result = $collection->insertMany($docs, ['bypassDocumentValidation' => true]);
// end-modify

