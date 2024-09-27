<?php
require 'vendor/autoload.php';

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your Atlas URI that connects to the sample dataset');
$client = new MongoDB\Client($uri);

// start-db-coll
$collection = $client->sample_restaurants->restaurants;
// end-db-coll

// Deletes a document that has a "name" value of "Ready Penny Inn"
// start-delete-one
$collection->deleteOne(['name' => 'Ready Penny Inn']);
// end-delete-one

// Deletes documents that have a "borough" value of "Brooklyn"
// start-delete-many
$collection->deleteMany(['borough' => 'Brooklyn']);
// end-delete-many

// Deletes matching documents and attaches a comment to the operation
// start-delete-options
$collection->deleteMany(
    ['name' => new MongoDB\BSON\Regex('Mongo')],
    ['comment' => 'Deleting Mongo restaurants'],
);
// end-delete-options

// Deletes and prints the number of documents that have a "cuisine" value of "Greek"
// start-delete-count
$result = $collection->deleteMany(['cuisine' => 'Greek']);
echo 'Deleted documents: ', $result->getDeletedCount(), PHP_EOL;
// end-delete-count

