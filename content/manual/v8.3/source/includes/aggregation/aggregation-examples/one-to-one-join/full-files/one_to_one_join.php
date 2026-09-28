<?php

require 'vendor/autoload.php';

use MongoDB\Client;
use MongoDB\BSON\UTCDateTime;
use MongoDB\Builder\Pipeline;
use MongoDB\Builder\Stage;
use MongoDB\Builder\Query;
use MongoDB\Builder\Expression;

$uri = '<connection string>';
$client = new Client($uri);

// start-insert-sample-data
$orders = $client->agg_tutorials_db->orders;
$products = $client->agg_tutorials_db->products;

$orders->deleteMany([]);
$products->deleteMany([]);

$orders->insertMany(
    [
        [
            'customer_id' => 'elise_smith@myemail.com',
            'orderdate' => new UTCDateTime(new DateTimeImmutable('2020-05-30T08:35:52')),
            'product_id' => 'a1b2c3d4',
            'value' => 431.43
        ],
        [
            'customer_id' => 'tj@wheresmyemail.com',
            'orderdate' => new UTCDateTime(new DateTimeImmutable('2019-05-28T19:13:32')),
            'product_id' => 'z9y8x7w6',
            'value' => 5.01
        ],
        [
            'customer_id' => 'oranieri@warmmail.com',
            'orderdate' => new UTCDateTime(new DateTimeImmutable('2020-01-01T08:25:37')),
            'product_id' => 'ff11gg22hh33',
            'value' => 63.13,
        ],
        [
            'customer_id' => 'jjones@tepidmail.com',
            'orderdate' => new UTCDateTime(new DateTimeImmutable('2020-12-26T08:55:46')),
            'product_id' => 'a1b2c3d4',
            'value' => 429.65
        ],
    ]
);

$products->insertMany(
    [
        [
            'id' => 'a1b2c3d4',
            'name' => 'Asus Laptop',
            'category' => 'ELECTRONICS',
            'description' => 'Good value laptop for students',
        ],
        [
            'id' => 'z9y8x7w6',
            'name' => 'The Day Of The Triffids',
            'category' => 'BOOKS',
            'description' => 'Classic post-apocalyptic novel',
        ],
        [
            'id' => 'ff11gg22hh33',
            'name' => 'Morphy Richardds Food Mixer',
            'category' => 'KITCHENWARE',
            'description' => 'Luxury mixer turning good cakes into great',
        ],
        [
            'id' => 'pqr678st',
            'name' => 'Karcher Hose Set',
            'category' => 'GARDEN',
            'description' => 'Hose + nozzles + winder for tidy storage',
        ],
    ]
);
// end-insert-sample-data

// start-lookup-fn
function lookupProductsStage()
{
    return Stage::lookup(
        from: 'products',
        localField: 'product_id',
        foreignField: 'id',
        as: 'product_mapping',
    );
}
// end-lookup-fn

$pipeline = new Pipeline(
    // start-match
    Stage::match(
        orderdate: [
            Query::gte(new UTCDateTime(new DateTimeImmutable('2020-01-01T00:00:00'))),
            Query::lt(new UTCDateTime(new DateTimeImmutable('2021-01-01T00:00:00'))),
        ]
    ),
    // end-match
    // start-lookup
    lookupProductsStage(),
    // end-lookup
    // start-set
    Stage::set(
        product_mapping: Expression::first(
            Expression::arrayFieldPath('product_mapping')
        )
    ),
    Stage::set(
        product_name: Expression::stringFieldPath('product_mapping.name'),
        product_category: Expression::stringFieldPath('product_mapping.category')
    ),
    // end-set
    // start-unset
    Stage::unset('_id', 'product_id', 'product_mapping')
    // end-unset
);

// start-run-agg
$cursor = $orders->aggregate($pipeline);
// end-run-agg

foreach ($cursor as $doc) {
    echo json_encode($doc, JSON_PRETTY_PRINT), PHP_EOL;
}
