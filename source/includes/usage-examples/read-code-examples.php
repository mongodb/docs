<?php

require_once __DIR__ . '/vendor/autoload.php';

use MongoDB\Client;

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your Atlas URI that connects to the sample dataset');
$client = new MongoDB\Client($uri);

$collection = $client->sample_mflix->movies;

// Find One
// start-find-one
$document = $collection->findOne(['year' => 1994]);
echo json_encode($document), PHP_EOL;
// end-find-one

// Find Multiple
// start-find-multiple
$resultsMultiple = $collection->find(['year' => 1970]);
foreach ($resultsMultiple as $doc) {
    echo json_encode($doc), PHP_EOL;
}
// end-find-multiple

// Count Document
// start-count
$result = $collection->countDocuments([]);
echo 'Number of documents: ', $result;
// end-count

// Count Specific Documents
// start-count-specific
$result = $collection->countDocuments(['year' => 2010]);
echo 'Number of companies founded in 2010: ', $result;
// end-count-specific

// Estimated Count
// start-count-estimate
$result = $collection->estimatedDocumentCount();
echo 'Estimated number of documents: ', $result;
// end-count-estimate

// Distinct Values
// start-distinct
$results = $collection->distinct('year');
foreach ($results as $value) {
    echo json_encode($value), PHP_EOL;
}
// end-distinct

// Data Changes
// start-change-stream
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
// end-change-stream
