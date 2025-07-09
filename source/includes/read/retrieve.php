<?php
require 'vendor/autoload.php';

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your Atlas URI that connects to the sample dataset');
$client = new MongoDB\Client($uri);

// start-db-coll
$collection = $client->sample_training->companies;
// end-db-coll

// Finds one document with a "name" value of "LinkedIn"
// start-find-one
$document = $collection->findOne(['name' => 'LinkedIn']);
echo json_encode($document), PHP_EOL;
// end-find-one

// Finds documents with a "founded_year" value of 1970
// start-find-many
$results = $collection->find(['founded_year' => 1970]);
// end-find-many

// Prints documents with a "founded_year" value of 1970
// start-cursor
foreach ($results as $doc) {
    echo json_encode($doc), PHP_EOL;
}
// end-cursor

// Finds and prints up to 5 documents with a "number_of_employees" value of 1000
// start-modify
$results = $collection->find(
    ['number_of_employees' => 1000],
    ['limit' => 5],
);

foreach ($results as $doc) {
    echo json_encode($doc), PHP_EOL;
}
// end-modify
