<?php

// start-imports
use MongoDB\Builder\Stage;
// end-imports

require 'vendor/autoload.php';

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your Atlas URI that connects to the sample dataset');
$client = new MongoDB\Client($uri);

$collection = $client->sample_mflix->embedded_movies;

define('WAIT_TIMEOUT_SEC', 300);

echo "\nCreating the Atlas Vector Search index.\n";
$collection->createSearchIndex(
    [
        'fields' => [[
            'type' => 'vector',
            'path' => 'plot_embedding',
            'numDimensions' => 1536,
            'similarity' => 'dotProduct',
            'quantization' => 'scalar'
        ]]
    ],
    ['name' => 'vector', 'type' => 'vectorSearch'],
);

// Wait for the index to be queryable.
wait(function () use ($collection) {
    echo '.';
    foreach ($collection->listSearchIndexes() as $index) {
        if ($index->name === 'vector') {
            return $index->queryable;
        }
    }

    return false;
});

echo "\n";

// start-basic-query
$pipeline = [
    Stage::vectorSearch(
        index: 'vector',
        path: 'plot_embedding',
        queryVector: [-0.0016261312, -0.028070757, -0.011342932],
        numCandidates: 150,
        limit: 5,
    ),
    Stage::project(
        _id: 0,
        title: 1,
    ),
];

$cursor = $collection->aggregate($pipeline);

foreach ($cursor as $doc) {
    echo json_encode($doc), PHP_EOL;
}
// end-basic-query

// start-score-query
$pipeline = [
    Stage::vectorSearch(
        index: 'vector',
        path: 'plot_embedding',
        queryVector: [-0.0016261312, -0.028070757, -0.011342932],
        numCandidates: 150,
        limit: 5,
    ),
    Stage::project(
        _id: 0,
        title: 1,
        score: ['$meta' => 'vectorSearchScore'],
    ),
];

$cursor = $collection->aggregate($pipeline);

foreach ($cursor as $doc) {
    echo json_encode($doc), PHP_EOL;
}
// end-score-query

/**
 * This function waits until the callback returns true or the timeout is reached.
 */
function wait(Closure $callback): void
{
    $timeout = hrtime()[0] + WAIT_TIMEOUT_SEC;
    while (hrtime()[0] < $timeout) {
        if ($callback()) {
            return;
        }

        sleep(5);
    }

    throw new RuntimeException('Time out');
}
