<?php

// start-builder-imports
use MongoDB\Builder\Query;
use MongoDB\Builder\Update;
// end-builder-imports

require 'vendor/autoload.php';

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your Atlas URI that connects to the sample dataset');
$client = new MongoDB\Client($uri);

// start-db-coll
$collection = $client->sample_restaurants->restaurants;
// end-db-coll

// Updates the "name" value of a document from "Bagels N Buns" to "2 Bagels 2 Buns"
// start-update-one
$result = $collection->updateOne(
    ['name' => 'Bagels N Buns'],
    ['$set' => ['name' => '2 Bagels 2 Buns']],
);
// end-update-one

// Updates the "cuisine" value of documents from "Pizza" to "Pasta"
// start-update-many
$result = $collection->updateMany(
    ['cuisine' => 'Pizza'],
    ['$set' => ['cuisine' => 'Pasta']],
);
// end-update-many

// Updates the "borough" value of matching documents and inserts a document if none match
// start-update-options
$result = $collection->updateMany(
    ['borough' => 'Manhattan'],
    ['$set' => ['borough' => 'Manhattan (north)']],
    ['upsert' => true],
);
// end-update-options

// Updates the "name" value of matching documents and prints the number of updates
// start-update-result
$result = $collection->updateMany(
    ['name' => 'Dunkin\' Donuts'],
    ['$set' => ['name' => 'Dunkin\'']],
);
echo 'Modified documents: ', $result->getModifiedCount();
// end-update-result

// Uses the builder to update the "name" field of the first matching document
// start-update-builder-one
$result = $collection->updateOne(
    Query::query(name: Query::eq('Bagels N Buns')),
    Update::set(name: '2 Bagels 2 Buns'),
);
// end-update-builder-one

// Uses the builder to apply multiple update operators to all matching documents
// start-update-builder-many
$result = $collection->updateMany(
    Query::query(cuisine: Query::eq('Pizza')),
    new Update(
        Update::set(cuisine: 'Pasta'),
        Update::unset('grades'),
    ),
);
// end-update-builder-many
