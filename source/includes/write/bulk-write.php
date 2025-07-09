<?php

require 'vendor/autoload.php';

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your Atlas URI that connects to the sample dataset');
$client = new MongoDB\Client($uri);

// start-db-coll
$collection = $client->sample_restaurants->restaurants;
// end-db-coll

// start-run-bulk
$result = $collection->bulkWrite(
    [
        [
            'insertOne' => [
                ['name' => 'Mongo\'s Deli'], 
                ['cuisine' => 'Sandwiches'], 
                ['borough' => 'Manhattan'], 
                ['restaurant_id' => '1234'], 
            ],
        ],
        [
            'updateOne' => [
                ['name' => 'Mongo\'s Deli'], 
                ['$set' => ['cuisine' => 'Sandwiches and Salads']],
            ],
        ],
        [
            'deleteMany' => [
                ['borough' => 'Manhattan'],
            ],
        ],
    ],
);
// end-run-bulk

// start-bulk-options
$result = $collection->bulkWrite(
    [
        [
            'insertOne' => [
                ['name' => 'Mongo\'s Pizza'], 
                ['cuisine' => 'Italian'], 
                ['borough' => 'Queens'], 
                ['restaurant_id' => '5678'], 
            ],
        ],
        [
            'deleteOne' => [
                ['restaurant_id' => '5678'],
            ],
        ],
    ],
    ['ordered' => false],
);
// end-bulk-options
