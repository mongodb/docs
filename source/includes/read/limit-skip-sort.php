<?php

require 'vendor/autoload.php';

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your Atlas URI that connects to the sample dataset');
$client = new MongoDB\Client($uri);

// start-db-coll
$collection = $client->sample_restaurants->restaurants;
// end-db-coll

// Retrieves 5 documents that have a "cuisine" value of "Italian"
// start-limit
$cursor = $collection->find(
    ['cuisine' => 'Italian'],
    ['limit' => 5]
);

foreach ($cursor as $doc) {
    echo json_encode($doc), PHP_EOL;
}
// end-limit

// Retrieves documents with a "cuisine" value of "Italian" and sorts in ascending "name" order
// start-sort
$cursor = $collection->find(
    ['cuisine' => 'Italian'], 
    ['sort' => ['name' => 1]]
);

foreach ($cursor as $doc) {
    echo json_encode($doc), PHP_EOL;
}
// end-sort

// Retrieves documents with a "borough" value of "Manhattan" but skips the first 10 results
// start-skip
$cursor = $collection->find(
    ['borough' => 'Manhattan'],
    ['skip' => 10]
);

foreach ($cursor as $doc) {
    echo json_encode($doc), PHP_EOL;
}
// end-skip

// Retrieves 5 documents with a "cuisine" value of "Italian", skips the first 10 results,
// and sorts by ascending "name" order
// start-limit-sort-skip
$options = [
    'sort' => ['name' => 1],
    'limit' => 5,
    'skip' => 10,
];

$cursor = $collection->find(['cuisine' => 'Italian'], $options);
foreach ($cursor as $doc) {
    echo json_encode($doc), PHP_EOL;
}
// end-limit-sort-skip

// Returns documents with a "cuisine" value of "Hawaiian" as arrays
// start-return-type
$options = [
    'typeMap' => [
        'root' => 'array', 
        'document' => 'array'
    ]
];

$cursor = $collection->find(['cuisine' => 'Hawaiian'], $options);
foreach ($cursor as $doc) {
    print_r($doc) . PHP_EOL;
}
// end-return-type
