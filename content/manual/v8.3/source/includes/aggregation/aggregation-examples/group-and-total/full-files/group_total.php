<?php

require 'vendor/autoload.php';

use MongoDB\Client;
use MongoDB\BSON\UTCDateTime;
use MongoDB\Builder\Pipeline;
use MongoDB\Builder\Stage;
use MongoDB\Builder\Type\Sort;
use MongoDB\Builder\Query;
use MongoDB\Builder\Expression;
use MongoDB\Builder\Accumulator;

use function MongoDB\object;

$uri = '<connection string>';
$client = new Client($uri);

// start-insert-orders
$orders = $client->agg_tutorials_db->orders;
$orders->deleteMany([]);

$orders->insertMany(
    [
        [
            'customer_id' => 'elise_smith@myemail.com',
            'orderdate' => new UTCDateTime(new DateTimeImmutable('2020-05-30T08:35:52')),
            'value' => 231
        ],
        [
            'customer_id' => 'elise_smith@myemail.com',
            'orderdate' => new UTCDateTime(new DateTimeImmutable('2020-01-13T09:32:07')),
            'value' => 99
        ],
        [
            'customer_id' => 'oranieri@warmmail.com',
            'orderdate' => new UTCDateTime(new DateTimeImmutable('2020-01-01T08:25:37')),
            'value' => 63
        ],
        [
            'customer_id' => 'tj@wheresmyemail.com',
            'orderdate' => new UTCDateTime(new DateTimeImmutable('2019-05-28T19:13:32')),
            'value' => 2
        ],
        [
            'customer_id' => 'tj@wheresmyemail.com',
            'orderdate' => new UTCDateTime(new DateTimeImmutable('2020-11-23T22:56:53')),
            'value' => 187
        ],
        [
            'customer_id' => 'tj@wheresmyemail.com',
            'orderdate' => new UTCDateTime(new DateTimeImmutable('2020-08-18T23:04:48')),
            'value' => 4
        ],
        [
            'customer_id' => 'elise_smith@myemail.com',
            'orderdate' => new UTCDateTime(new DateTimeImmutable('2020-12-26T08:55:46')),
            'value' => 4
        ],
        [
            'customer_id' => 'tj@wheresmyemail.com',
            'orderdate' => new UTCDateTime(new DateTimeImmutable('2021-02-28T07:49:32')),
            'value' => 1024
        ],
        [
            'customer_id' => 'elise_smith@myemail.com',
            'orderdate' => new UTCDateTime(new DateTimeImmutable('2020-10-03T13:49:44')),
            'value' => 102
        ]
    ]
);
// end-insert-orders

// start-group-fn
function groupByCustomerStage()
{
    return Stage::group(
        _id: Expression::stringFieldPath('customer_id'),
        first_purchase_date: Accumulator::first(
            Expression::arrayFieldPath('orderdate')
        ),
        total_value: Accumulator::sum(
            Expression::numberFieldPath('value'),
        ),
        total_orders: Accumulator::sum(1),
        orders: Accumulator::push(
            object(
                orderdate: Expression::dateFieldPath('orderdate'),
                value: Expression::numberFieldPath('value'),
            ),
        ),
    );
}
// end-group-fn

$pipeline = new Pipeline(
    // start-match
    Stage::match(
        orderdate: [
            Query::gte(new UTCDateTime(new DateTimeImmutable('2020-01-01T00:00:00'))),
            Query::lt(new UTCDateTime(new DateTimeImmutable('2021-01-01T00:00:00'))),
        ]
    ),
    // end-match
    // start-sort1
    Stage::sort(orderdate: Sort::Asc),
    // end-sort1
    // start-group
    groupByCustomerStage(),
    // end-group
    // start-sort2
    Stage::sort(first_purchase_date: Sort::Asc),
    // end-sort2
    // start-set
    Stage::set(customer_id: Expression::stringFieldPath('_id')),
    // end-set
    // start-unset
    Stage::unset('_id')
    // end-unset
);

// start-run-agg
$cursor = $orders->aggregate($pipeline);
// end-run-agg

foreach ($cursor as $doc) {
    echo json_encode($doc, JSON_PRETTY_PRINT), PHP_EOL;
}
