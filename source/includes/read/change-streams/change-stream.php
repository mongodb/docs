<?php
require 'vendor/autoload.php'; 

// start-to-json
function toJSON(object $document): string
{
    return MongoDB\BSON\Document::fromPHP($document)->toRelaxedExtendedJSON();
}
// end-to-json

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your Atlas URI that connects to the sample dataset');
$client = new MongoDB\Client($uri);

// start-db-coll
$collection = $client->sample_restaurants->restaurants;
// end-db-coll

// Monitors and prints changes to the "restaurants" collection
// start-open-change-stream
$changeStream = $collection->watch();
$changeStream->rewind();

while (true) {
    $changeStream->next();

    if ($changeStream->valid()) {
        continue;
    }

    $event = $changeStream->current();
    echo toJSON($event), PHP_EOL;

    if ($changeStream->current()['operationType'] === 'invalidate') {
        break;
    }
}
// end-open-change-stream

// Updates a document that has a "name" value of "Blarney Castle"
// start-update-for-change-stream
$result = $collection->updateOne(
    ['name' => 'Blarney Castle'],
    ['$set' => ['cuisine' => 'Irish']]
);
// end-update-for-change-stream
