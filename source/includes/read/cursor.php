<?php
require 'vendor/autoload.php';

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your Atlas URI that connects to the sample dataset');
$client = new MongoDB\Client($uri);

// start-db-coll
$collection = $client->sample_restaurants->restaurants;
// end-db-coll

// Iterates over and prints all documents that have a "name" value of "Dunkin' Donuts"
// start-cursor-iterate
$cursor = $collection->find(['name' => 'Dunkin\' Donuts']);
foreach ($cursor as $doc) {
    echo json_encode($doc), PHP_EOL;
}
// end-cursor-iterate

// Retrieves and prints the first document stored in the cursor
// start-cursor-first
$cursor = $collection->find(['name' => 'Dunkin\' Donuts']);
$cursor->rewind();
echo json_encode($cursor->current());
// end-cursor-first

// Converts the documents stored in a cursor to an array
// start-cursor-array
$cursor = $collection->find(['name' => 'Dunkin\' Donuts']);
$array_results = $cursor->toArray();
// end-cursor-array

// Creates a collection with a maximum size and inserts documents representing vegetables
// start-capped-coll
$db = $client->db;
$create_coll = $db->createCollection(
    'vegetables', 
    ['capped' => true, 'size' => 1024 * 1024]
);

$vegetables = [
    ['name' => 'cauliflower'],
    ['name' => 'zucchini']
];

$collection = $db->vegetables;
$result = $collection->insertMany($vegetables);
// end-capped-coll

// Iterates over the initial query results and continues iterating until three documents are stored in the cursor
// by using a tailable cursor
// start-tailable
$cursor = $collection->find([], ['cursorType' => MongoDB\Operation\Find::TAILABLE]);
$cursor->rewind();

$docs_found = 0;
while ($docs_found < 3) {
    if ($cursor->valid()) {
        $doc = $cursor->current();
        echo json_encode($doc), PHP_EOL;
        $docs_found++;
    }
    $cursor->next();
}
// end-tailable
