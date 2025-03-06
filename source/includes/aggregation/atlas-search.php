<?php

// start-imports
use MongoDB\Builder\Search;
use MongoDB\Builder\Stage;
// end-imports

require 'vendor/autoload.php';

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your Atlas URI that connects to the sample dataset');
$client = new MongoDB\Client($uri);

$collection = $client->sample_restaurants->restaurants;

define('WAIT_TIMEOUT_SEC', 300);

echo "\nCreating the Atlas Search index.\n";
$collection->createSearchIndex(
    ['mappings' => ['dynamic' => true]],
);

// Waits for the index to be queryable
wait(function () use ($collection) {
    echo '.';
    foreach ($collection->listSearchIndexes() as $index) {
        if ($index->name === 'default') {
            return $index->queryable;
        }
    }

    return false;
});

echo "\n";

// start-compound-search-query
$pipeline = [
    Stage::search(
        Search::compound(
            must: [
                Search::text(
                    query: 'kitchen',
                    path: 'name',
                ),
            ],
            should: [
                Search::text(
                    query: 'american',
                    path: 'cuisine',
                ),
            ],
            filter: [
                Search::text(
                    query: 'Queens',
                    path: 'borough',
                ),
            ],
        ),
    ),
    Stage::project(
        borough: 1,
        cuisine: 1,
        name: 1
    ),
    Stage::limit(3)
];

$cursor = $collection->aggregate($pipeline);

foreach ($cursor as $doc) {
    echo json_encode($doc), PHP_EOL;
}
// end-compound-search-query

echo "\nUpdating the Atlas Search index for autocomplete.\n";
$collection->updateSearchIndex(
    'default',
    ['mappings' => [
        "dynamic" => false,
        "fields" => [
            "name" => [
                ["type" => "stringFacet"],
                ["type" => "string"],
                [
                    "foldDiacritics" => false,
                    "maxGrams" => 7,
                    "minGrams" => 3,
                    "tokenization" => "edgeGram",
                    "type" => "autocomplete"
                ],
            ]
        ]
    ]]
);

// Waits for the index to be updated.
wait(function () use ($collection) {
    echo '.';
    foreach ($collection->listSearchIndexes() as $index) {
        if ($index->name === 'default') {
            return $index->latestDefinition->mappings->fields->name[2]['type'] === 'autocomplete'
                && $index->status === 'READY';
        }
    }

    return false;
});

echo "\n";

// start-autocomplete-search-query
$pipeline = [
    Stage::search(
        Search::autocomplete(
            query: 'Lucy',
            path: 'name',
        ),
    ),
    Stage::limit(3),
    Stage::project(_id: 0, name: 1),
];

$cursor = $collection->aggregate($pipeline);

foreach ($cursor as $doc) {
    echo json_encode($doc), PHP_EOL;
}
// end-autocomplete-search-query

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
