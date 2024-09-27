<?php
require 'vendor/autoload.php';

use MongoDB\BSON\Document;

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your Atlas URI that connects to the sample dataset');
$client = new MongoDB\Client($uri);

// start-db-coll
$collection = $client->sample_restaurants->restaurants;
// end-db-coll

// Retrieves distinct values of the "borough" field
// start-distinct
$results = $collection->distinct('borough', []);
foreach ($results as $value) {
    echo json_encode($value), PHP_EOL;
}
// end-distinct

// Retrieves distinct "borough" field values for documents with a "cuisine" value of "Italian"
// start-distinct-with-query
$results = $collection->distinct('borough', ['cuisine' => 'Italian']);
foreach ($results as $value) {
    echo json_encode($value), PHP_EOL;
}
// end-distinct-with-query

// Retrieves distinct "name" field values for documents matching the "borough" and "cuisine" fields query
// and attaches a comment to the operation
// start-distinct-with-comment
$query = ['borough' => 'Bronx', 'cuisine' => 'Pizza'];
$options = ['comment' => 'Bronx pizza restaurants'];
$results = $collection->distinct('name', $query, $options);

foreach ($results as $value) {
    echo json_encode($value), PHP_EOL;
}
// end-distinct-with-comment

