<?php
require 'vendor/autoload.php';

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your Atlas URI that connects to the sample dataset');
$client = new MongoDB\Client($uri);

$collection = $client->sample_restaurants->restaurants;

// Retrieves documents with a cuisine value of "Bakery", groups them by "borough", and
// counts each borough's matching documents
// start-match-group
$pipeline = [
    ['$match' => ['cuisine' => 'Bakery']],
    ['$group' => ['_id' => '$borough', 'count' => ['$sum' => 1]]],
];

$cursor = $collection->aggregate($pipeline);

foreach ($cursor as $doc) {
    echo json_encode($doc), PHP_EOL;
}
// end-match-group

// Performs the same aggregation operation as above but asks MongoDB to explain it
// start-explain
$pipeline = [
    ['$match' => ['cuisine' => 'Bakery']],
    ['$group' => ['_id' => '$borough', 'count' => ['$sum' => 1]]],
];

$aggregate = new MongoDB\Operation\Aggregate(
    $collection->getDatabaseName(),
    $collection->getCollectionName(),
    $pipeline
);

$result = $collection->explain($aggregate);
echo json_encode($result), PHP_EOL;
// end-explain

