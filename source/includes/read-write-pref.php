<?php
require 'vendor/autoload.php';

use MongoDB\Driver\ReadConcern;
use MongoDB\Driver\ReadPreference;
use MongoDB\Driver\WriteConcern;
use MongoDB\Client;

// start-client-settings
$clientOptions = [
    'readPreference' => 'secondary',
    'readConcernLevel' => 'local',
    'w' => '2',
];

$client = new Client('mongodb://localhost:27017', $clientOptions);
// end-client-settings

// start-client-settings-uri
$uri = 'mongodb://localhost:27017/?readPreference=secondary&readConcernLevel=local&w=2';
$client = new Client($uri);
// end-client-settings-uri

// start-session-settings
$sessionOptions = [
    'readPreference' => new ReadPreference(ReadPreference::PRIMARY_PREFERRED),
    'readConcern' => new ReadConcern(ReadConcern::LOCAL),
    'writeConcern' => new WriteConcern(WriteConcern::MAJORITY),
];

$session = $client->startSession($sessionOptions);
// end-session-settings

// start-transaction-settings
$transactionOptions = [
    'readPreference' => new ReadPreference(ReadPreference::PRIMARY),
    'readConcern' => new ReadConcern(ReadConcern::MAJORITY),
    'writeConcern' => new WriteConcern(1),
];

$session->startTransaction($transactionOptions);
// end-transaction-settings

// Sets read and write settings for the "test_database" database
// start-database-settings
$db = $client->getDatabase('test_database', [
    'readPreference' => new ReadPreference(ReadPreference::PRIMARY_PREFERRED),
    'readConcern' => new ReadConcern(ReadConcern::AVAILABLE),
    'writeConcern' => new WriteConcern(WriteConcern::MAJORITY),
]);
// end-database-settings

// Sets read and write settings for the "test_collection" collection
// start-collection-settings
$collection = $client->getCollection('test_database', 'test_collection', [
    'readPreference' => new ReadPreference(ReadPreference::SECONDARY_PREFERRED),
    'readConcern' => new ReadConcern(ReadConcern::AVAILABLE),
    'writeConcern' => new WriteConcern(0),
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

$client = new Client('mongodb://localhost:27017', [], $options);
// end-local-threshold
