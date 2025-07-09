<?php

require 'vendor/autoload.php';

use MongoDB\Client;

// start-setup
$uri = '<connection string>';
$client = new Client($uri);
$collection = $client->db->fruits;

// Inserts documents representing fruits
$fruits = [
    [
        '_id' => 1,
        'name' => 'apples',
        'qty' => 5,
        'rating' => 3,
        'color' => 'red',
        'type' => ['fuji', 'honeycrisp'],
    ],
    [
        '_id' => 2,
        'name' => 'bananas',
        'qty' => 7,
        'rating' => 4,
        'color' => 'yellow',
        'type' => ['cavendish'],
    ],
    [
        '_id' => 3,
        'name' => 'oranges',
        'qty' => 6,
        'rating' => 2,
        'type' => ['naval', 'mandarin'],
    ],
    [
        '_id' => 4,
        'name' => 'pineapples',
        'qty' => 3,
        'rating' => 5,
        'color' => 'yellow',
    ],
];

$result = $collection->insertMany($fruits);
// end-setup

// Retrieves documents in which the "color" value is "yellow"
// start-find-exact
$cursor = $collection->find(['color' => 'yellow']);
foreach ($cursor as $doc) {
    echo json_encode($doc), PHP_EOL;
}
// end-find-exact

// Retrieves all documents in the collection
// start-find-all
$cursor = $collection->find([]);
foreach ($cursor as $doc) {
    echo json_encode($doc), PHP_EOL;
}
// end-find-all

// Retrieves and prints documents in which the "rating" value is greater than 2
// start-find-comparison
$cursor = $collection->find(['rating' => ['$gt' => 2]]);
foreach ($cursor as $doc) {
    echo json_encode($doc), PHP_EOL;
}
// end-find-comparison

// Retrieves and prints documents that match one or both query filters
// start-find-logical
$cursor = $collection->find([
    '$or' => [
        ['qty' => ['$gt' => 5]],
        ['color' => 'yellow'],
    ],
]);
foreach ($cursor as $doc) {
    echo json_encode($doc), PHP_EOL;
}
// end-find-logical

// Retrieves and prints documents in which the "type" array has 2 elements
// start-find-array
$cursor = $collection->find(['type' => ['$size' => 2]]);
foreach ($cursor as $doc) {
    echo json_encode($doc), PHP_EOL;
}
// end-find-array

// Retrieves and prints documents that have a "color" field
// start-find-element
$cursor = $collection->find(['color' => ['$exists' => true]]);
foreach ($cursor as $doc) {
    echo json_encode($doc), PHP_EOL;
}
// end-find-element

// Retrieves and prints documents in which the "name" value has at least two consecutive "p" characters
// start-find-evaluation
$cursor = $collection->find(['name' => ['$regex' => 'p{2,}']]);
foreach ($cursor as $doc) {
    echo json_encode($doc), PHP_EOL;
}
// end-find-evaluation
