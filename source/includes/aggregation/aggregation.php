<?php

require 'vendor/autoload.php';

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your Atlas URI that connects to the sample dataset');
$client = new MongoDB\Client($uri);

$collection = $client->sample_restaurants->restaurants;

// Retrieves documents with a cuisine value of "Bakery", groups them by "borough", and
// counts each borough's matching documents
// start-array-match-group
$pipeline = [
    ['$match' => ['cuisine' => 'Bakery']],
    ['$group' => ['_id' => '$borough', 'count' => ['$sum' => 1]]],
];

$cursor = $collection->aggregate($pipeline);

foreach ($cursor as $doc) {
    echo json_encode($doc), PHP_EOL;
}
// end-array-match-group

// Performs the same aggregation operation as above but asks MongoDB to explain it
// start-array-explain
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
// end-array-explain

// start-builder-match-group
$pipeline = new MongoDB\Builder\Pipeline(
    MongoDB\Builder\Stage::match(
        date: [
            MongoDB\Builder\Query::gte(new MongoDB\BSON\UTCDateTime(new DateTimeImmutable('2014-01-01'))),
            MongoDB\Builder\Query::lt(new MongoDB\BSON\UTCDateTime(new DateTimeImmutable('2015-01-01'))),
        ],
    ),
    MongoDB\Builder\Stage::group(
        _id: MongoDB\Builder\Expression::dateToString(MongoDB\Builder\Expression::dateFieldPath('date'), '%Y-%m-%d'),
        totalSaleAmount: MongoDB\Builder\Accumulator::sum(
            MongoDB\Builder\Expression::multiply(
                MongoDB\Builder\Expression::numberFieldPath('price'),
                MongoDB\Builder\Expression::numberFieldPath('quantity'),
            ),
        ),
        averageQuantity: MongoDB\Builder\Accumulator::avg(
            MongoDB\Builder\Expression::numberFieldPath('quantity'),
        ),
        count: MongoDB\Builder\Accumulator::sum(1),
    ),
    MongoDB\Builder\Stage::sort(
        totalSaleAmount: MongoDB\Builder\Type\Sort::Desc,
    ),
);

$cursor = $collection->aggregate($pipeline);

foreach ($cursor as $doc) {
    echo json_encode($doc), PHP_EOL;
}
// end-builder-match-group

// start-builder-unwind
$pipeline = new MongoDB\Builder\Pipeline(
    MongoDB\Builder\Stage::unwind(MongoDB\Builder\Expression::arrayFieldPath('items')),
    MongoDB\Builder\Stage::unwind(MongoDB\Builder\Expression::arrayFieldPath('items.tags')),
    MongoDB\Builder\Stage::group(
        _id: MongoDB\Builder\Expression::fieldPath('items.tags'),
        totalSalesAmount: MongoDB\Builder\Accumulator::sum(
            MongoDB\Builder\Expression::multiply(
                MongoDB\Builder\Expression::numberFieldPath('items.price'),
                MongoDB\Builder\Expression::numberFieldPath('items.quantity'),
            ),
        ),
    ),
);

$cursor = $collection->aggregate($pipeline);

foreach ($cursor as $doc) {
    echo json_encode($doc), PHP_EOL;
}
// end-builder-unwind

$collection = $client->db->orders;

// start-builder-lookup
$pipeline = new MongoDB\Builder\Pipeline(
    MongoDB\Builder\Stage::lookup(
        from: 'inventory',
        localField: 'item',
        foreignField: 'sku',
        as: 'inventory_docs',
    ),
);

/* Performs the aggregation on the orders collection */
$cursor = $collection->aggregate($pipeline);

foreach ($cursor as $doc) {
    echo json_encode($doc), PHP_EOL;
}
// end-builder-lookup
