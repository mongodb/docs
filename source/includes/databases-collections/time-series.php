<?php
require 'vendor/autoload.php'; 

$uri = getenv('MONGODB_URI') ?: 'mongodb://localhost:27017';
$client = new MongoDB\Client($uri);

// Creates a time series collection to store precipitation data
// start-create-ts
$db = $client->precipitation;

$options = [
    'timeseries' => [
        'timeField' => 'timestamp',
        'metaField' => 'location',
        'granularity' => 'minutes',
    ]
];

$db->createCollection('sept2023', $options);
// end-create-ts

// Lists the collections in the "precipitation" database
// start-list-colls
$cursor = $db->listCollections();

foreach ($cursor as $collectionInfo) {
    print_r($collectionInfo) . PHP_EOL;
}
// end-list-colls

// Inserts precipitation time series data about New York City into the collection
// start-insert-ts
$collection = $db->sept2023;
$result = $collection->insertMany(
    [
        [
            'precipitation_mm' => 0.5,
            'location' => 'New York City',
            'timestamp' => new MongoDB\BSON\UTCDateTime(1694829060000),
        ],
        [
            'precipitation_mm' => 2.8,
            'location' => 'New York City',
            'timestamp' => new MongoDB\BSON\UTCDateTime(1695594780000),
        ],
    ]
);
// end-insert-ts
