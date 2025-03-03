<?php

// start-imports
use MongoDB\Builder\Pipeline;
use MongoDB\Builder\Query;
use MongoDB\Builder\Stage;
// end-imports

require 'vendor/autoload.php';

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your Atlas URI that connects to the sample dataset');
$client = new MongoDB\Client($uri);

// start-db-coll
$collection = $client->sample_geospatial->shipwrecks;
// end-db-coll

// start-find
// Creates a query filter by using builders and
// retrieves matching documents
$docs = $collection->find(
    Query::query(
        feature_type: Query::eq('Wrecks - Visible'),
        coordinates: Query::near(
            Query::geometry(
                type: 'Point',
                coordinates: [-79.9, 9.3],
            ),
            maxDistance: 10000,
        )
    )
);

// Prints matching documents
foreach ($docs as $doc) {
    echo json_encode($doc), PHP_EOL;
}
// end-find

// start-deleteone
// Creates a query filter by using builders
// and deletes the first matching document
$result = $collection->deleteOne(
    Query::or(
        Query::query(feature_type: Query::regex('nondangerous$', '')),
        Query::query(depth: Query::gt(10.0)),
    )
);

// Prints number of deleted documents
echo 'Deleted documents: ', $result->getDeletedCount(), PHP_EOL;
// end-deleteone

// start-updateone
// Creates a query filter and an update document by
// using builders and updates the first matching document
$result = $collection->updateOne(
    Query::query(watlev: Query::eq('partly submerged at high water')),
    new Pipeline(
        Stage::set(year: 1870),
    ),
);

// Prints number of updated documents
echo 'Updated documents: ', $result->getModifiedCount(), PHP_EOL;
// end-updateone

// start-cs
// Creates a pipeline to filter for update operations and return
// only specific fields
$pipeline = [
    Stage::match(operationType: Query::eq('update')),
    Stage::project(operationType: 1, ns: 1, fullDocument: 1),
];

// Opens the change stream
$changeStream = $collection->watch(
    $pipeline,
    ['fullDocument' => MongoDB\Operation\Watch::FULL_DOCUMENT_UPDATE_LOOKUP]
);

// Prints change events based on the pipeline specifications
for ($changeStream->rewind(); true; $changeStream->next()) {
    if (! $changeStream->valid()) {
        continue;
    }
    $event = $changeStream->current();
    echo json_encode($event), PHP_EOL;

    if ($event['operationType'] === 'invalidate') {
        break;
    }
}
// end-cs
