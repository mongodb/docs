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

// Passes an options argument to watch() to include the post-image of updated documents
// start-change-stream-post-image
$options = ['fullDocument' => MongoDB\Operation\Watch::FULL_DOCUMENT_UPDATE_LOOKUP];
$changeStream = $collection->watch([], $options);
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
// end-change-stream-post-image
