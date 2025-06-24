<?php

require 'vendor/autoload.php';

use MongoDB\Client;
use MongoDB\BSON\UTCDateTime;
use MongoDB\Builder\Pipeline;
use MongoDB\Builder\Stage;
use MongoDB\Builder\Query;
use MongoDB\Builder\Expression;

use function MongoDB\object;

$uri = '<connection string>';
$client = new Client($uri);

// start-insert-sample-data
$products = $client->agg_tutorials_db->products;
$orders = $client->agg_tutorials_db->orders;

$products->deleteMany([]);
$orders->deleteMany([]);

$products->insertMany(
    [
        [
            'name' => "Asus Laptop",
            'variation' => "Ultra HD",
            'category' => "ELECTRONICS",
            'description' => "Great for watching movies"
        ],
        [
            'name' => "Asus Laptop",
            'variation' => "Standard Display",
            'category' => "ELECTRONICS",
            'description' => "Good value laptop for students"
        ],
        [
            'name' => "The Day Of The Triffids",
            'variation' => "1st Edition",
            'category' => "BOOKS",
            'description' => "Classic post-apocalyptic novel"
        ],
        [
            'name' => "The Day Of The Triffids",
            'variation' => "2nd Edition",
            'category' => "BOOKS",
            'description' => "Classic post-apocalyptic novel"
        ],
        [
            'name' => "Morphy Richards Food Mixer",
            'variation' => "Deluxe",
            'category' => "KITCHENWARE",
            'description' => "Luxury mixer turning good cakes into great"
        ]
    ]
);

$orders->insertMany(
    [
        [
            'customer_id' => "elise_smith@myemail.com",
            'orderdate' => new UTCDateTime((new DateTimeImmutable("2020-05-30T08:35:52"))),
            'product_name' => "Asus Laptop",
            'product_variation' => "Standard Display",
            'value' => 431.43
        ],
        [
            'customer_id' => "tj@wheresmyemail.com",
            'orderdate' => new UTCDateTime((new DateTimeImmutable("2019-05-28T19:13:32"))),
            'product_name' => "The Day Of The Triffids",
            'product_variation' => "2nd Edition",
            'value' => 5.01
        ],
        [
            'customer_id' => "oranieri@warmmail.com",
            'orderdate' => new UTCDateTime((new DateTimeImmutable("2020-01-01T08:25:37"))),
            'product_name' => "Morphy Richards Food Mixer",
            'product_variation' => "Deluxe",
            'value' => 63.13
        ],
        [
            'customer_id' => "jjones@tepidmail.com",
            'orderdate' => new UTCDateTime((new DateTimeImmutable("2020-12-26T08:55:46"))),
            'product_name' => "Asus Laptop",
            'product_variation' => "Standard Display",
            'value' => 429.65
        ]
    ]
);
// end-insert-sample-data

$embeddedPipeline = new Pipeline(
    // start-embedded-pl-match1
    Stage::match(
        Query::expr(
            Expression::and(
                Expression::eq(
                    Expression::stringFieldPath('product_name'),
                    Expression::variable('prdname')
                ),
                Expression::eq(
                    Expression::stringFieldPath('product_variation'),
                    Expression::variable('prdvartn')
                ),
            )
        )
    ),
    // end-embedded-pl-match1
    // start-embedded-pl-match2
    Stage::match(
        orderdate: [
            Query::gte(new UTCDateTime(new DateTimeImmutable('2020-01-01T00:00:00'))),
            Query::lt(new UTCDateTime(new DateTimeImmutable('2021-01-01T00:00:00'))),
        ]
    ),
    // end-embedded-pl-match2
    // start-embedded-pl-unset
    Stage::unset('_id', 'product_name', 'product_variation')
    // end-embedded-pl-unset
);

// start-lookup-fn
function lookupOrdersStage(Pipeline $embeddedPipeline)
{
    return Stage::lookup(
        from: 'orders',
        let: object(
            prdname: Expression::stringFieldPath('name'),
            prdvartn: Expression::stringFieldPath('variation'),
        ),
        pipeline: $embeddedPipeline,
        as: 'orders',
    );
}
// end-lookup-fn

$pipeline = new Pipeline(
    // start-group
    lookupOrdersStage($embeddedPipeline),
    // end-group
    // start-match
    Stage::match(
        orders: Query::ne([])
    ),
    // end-match
    // start-unset
    Stage::unset('_id', 'description')
    // end-unset
);

// start-run-agg
$cursor = $products->aggregate($pipeline);
// end-run-agg

foreach ($cursor as $doc) {
    echo json_encode($doc, JSON_PRETTY_PRINT), PHP_EOL;
}
