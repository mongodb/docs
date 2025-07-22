<?php
require 'vendor/autoload.php';

use MongoDB\Driver\ReadConcern;
use MongoDB\Driver\ReadPreference;
use MongoDB\Driver\WriteConcern;

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your connection URI');
$client = new MongoDB\Client($uri);

// Accesses the "test_database" database
// start-access-database
$db = $client->getDatabase('test_database');
// end-access-database

// Invokes the __get() method to access the "test_database" database
// start-access-database-short
$db = $client->test_database;
// end-access-database-short

// Accesses the "test_collection" collection
// start-access-collection
$collection = $client->test_database->getCollection('test_collection');
// end-access-collection

// Invokes the __get() method to access the "test_collection" collection
// start-access-collection-short
$collection = $db->test_collection;
// end-access-collection-short

// Explicitly creates the "example_collection" collection
// start-create-collection
$client->test_database->createCollection('example_collection');
// end-create-collection

// Lists the collections in the "test_database" database
// start-find-collections
foreach ($client->test_database->listCollections() as $collectionInfo) {
    print_r($collectionInfo) . PHP_EOL;
}
// end-find-collections

// Deletes the "test_collection" collection
// start-drop-collection
$client->test_database->dropCollection('test_collection');
// end-drop-collection

// Sets read and write settings for the "test_database" database
// start-database-settings
$readPreference = new ReadPreference(ReadPreference::RP_SECONDARY);
$readConcern = new ReadConcern(ReadConcern::LOCAL);
$writeConcern = new WriteConcern(WriteConcern::MAJORITY);

$db = $client->getDatabase('test_database', [
    'readPreference' => $readPreference,
    'readConcern' => $readConcern,
    'writeConcern' => $writeConcern,
]);
// end-database-settings

// Sets read and write settings for the "test_collection" collection
// start-collection-settings
$readPreference = new ReadPreference(ReadPreference::RP_PRIMARY);
$readConcern = new ReadConcern(ReadConcern::AVAILABLE);
$writeConcern = new WriteConcern(WriteConcern::MAJORITY);

$collection = $client->getCollection('test_database', 'test_collection', [
    'readPreference' => $readPreference,
    'readConcern' => $readConcern,
    'writeConcern' => $writeConcern,
]);

// end-collection-settings

// Instructs the library to prefer reads from secondary replica set members
// located in New York, followed by a secondary in San Francisco, and
// lastly fall back to any secondary.
// start-tag-set
$readPreference = new ReadPreference(
    ReadPreference::RP_SECONDARY,
    [
        ['dc' => 'ny'],
        ['dc' => 'sf'],
        [],
    ],
);

$db = $client->getDatabase(
    'test_database',
    ['readPreference' => $readPreference],
);

// end-tag-set

// Instructs the library to distribute reads between members within 35 milliseconds
// of the closest member's ping time
// start-local-threshold
$options = [
    'replicaSet' => 'repl0',
    'readPreference' => new ReadPreference(ReadPreference::RP_SECONDARY_PREFERRED),
    'localThresholdMS' => 35,
];

$client = new Client('<connection string>', [], $options);
// end-local-threshold
