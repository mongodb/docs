<?php

require 'vendor/autoload.php';

// Replace the placeholder with your Atlas connection string
$uri = "<connection-string>";
$client = new MongoDB\Client($uri);
$collection = $client->sample_mflix->embedded_movies;
$indexName = "vector_index";
try {
    $result = $collection->createSearchIndexes(
        [[
            'name' => $indexName,
            'type' => 'vectorSearch',
            'definition' => [
                'fields' => [[
                    'type' => 'vector',
                    'path' => 'plot_embedding',
                    'numDimensions' => 1536,
                    'similarity' => 'dotProduct',
                    'quantization' => 'scalar'
                ]]
            ],
        ]]
    );
    echo "New search index named $result[0] is building." .PHP_EOL;

    // Polling for the index to become queryable
    echo "Polling to check if the index is ready. This may take up to a minute." .PHP_EOL;
    $isIndexQueryable = false;
    while (!$isIndexQueryable) {
        // List the search indexes
        $searchIndexes = $collection->listSearchIndexes();
        // Check if the index is present and queryable
        foreach ($searchIndexes as $index) {
            if ($index->name === $indexName) {
                $isIndexQueryable = $index->queryable;
            }
        }
        if (!$isIndexQueryable) {
            sleep(5); // Wait for 5 seconds before polling again
        }
    }
    echo "$indexName is ready for querying." .PHP_EOL;
}
catch (MongoDB\Driver\Exception\Exception $e) {
    print 'Error creating the index: ' .$e->getMessage() .PHP_EOL;
}
