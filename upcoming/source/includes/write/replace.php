<?php
require 'vendor/autoload.php';

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your Atlas URI that connects to the sample dataset');
$client = new MongoDB\Client($uri);

// start-db-coll
$collection = $client->sample_restaurants->restaurants;
// end-db-coll

// start-replace-one
$replaceDocument = [
    'name' => 'Mongo\'s Pizza',
    'cuisine' => 'Pizza',
    'address' => [
        'street' => '123 Pizza St',
        'zipCode' => '10003',
    ],
    'borough' => 'Manhattan',
];

$result = $collection->replaceOne(['name' => 'Pizza Town'], $replaceDocument);
echo 'Modified documents: ', $result->getModifiedCount();
// end-replace-one

// start-replace-options
$replaceDocument = [
    'name' => 'Food World',
    'cuisine' => 'Mixed',
    'address' => [
        'street' => '123 Food St',
        'zipCode' => '10003',
    ],
    'borough' => 'Manhattan',
];

$result = $collection->replaceOne(
    ['name' => 'Food Town'],
    $replaceDocument,
    ['upsert' => true],
);
// end-replace-options
