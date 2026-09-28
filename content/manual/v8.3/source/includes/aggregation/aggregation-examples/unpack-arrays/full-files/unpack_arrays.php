<?php

require 'vendor/autoload.php';

use MongoDB\Client;
use MongoDB\Builder\Pipeline;
use MongoDB\Builder\Stage;
use MongoDB\Builder\Query;
use MongoDB\Builder\Expression;
use MongoDB\Builder\Accumulator;

$uri = '<connection string>';
$client = new Client($uri);

// start-insert-orders
$orders = $client->agg_tutorials_db->orders;
$orders->deleteMany([]);

$orders->insertMany(
    [
        [
            'order_id' => 6363763262239,
            'products' => [
                [
                    'prod_id' => 'abc12345',
                    'name' => 'Asus Laptop',
                    'price' => 431,
                ],
                [
                    'prod_id' => 'def45678',
                    'name' => 'Karcher Hose Set',
                    'price' => 22,
                ],
            ],
        ],
        [
            'order_id' => 1197372932325,
            'products' => [
                [
                    'prod_id' => 'abc12345',
                    'name' => 'Asus Laptop',
                    'price' => 429,
                ],
            ],
        ],
        [
            'order_id' => 9812343774839,
            'products' => [
                [
                    'prod_id' => 'pqr88223',
                    'name' => 'Morphy Richards Food Mixer',
                    'price' => 431,
                ],
                [
                    'prod_id' => 'def45678',
                    'name' => 'Karcher Hose Set',
                    'price' => 21,
                ],
            ],
        ],
        [
            'order_id' => 4433997244387,
            'products' => [
                [
                    'prod_id' => 'def45678',
                    'name' => 'Karcher Hose Set',
                    'price' => 23,
                ],
                [
                    'prod_id' => 'jkl77336',
                    'name' => 'Picky Pencil Sharpener',
                    'price' => 1,
                ],
                [
                    'prod_id' => 'xyz11228',
                    'name' => 'Russell Hobbs Chrome Kettle',
                    'price' => 16,
                ],
            ],
        ]
    ]
);
// end-insert-orders

// start-group-fn
function groupByProductStage()
{
    return Stage::group(
        _id: Expression::stringFieldPath('products.prod_id'),
        product: Accumulator::first(
            Expression::stringFieldPath('products.name')
        ),
        total_value: Accumulator::sum(
            Expression::numberFieldPath('products.price'),
        ),
        quantity: Accumulator::sum(1)
    );
}
// end-group-fn

$pipeline = new Pipeline(
    // start-unwind
    Stage::unwind(
        path: Expression::arrayFieldPath('products')
    ),
    // end-unwind
    // start-match
    Stage::match(
        ['products.price' => Query::gt(15)]
    ),
    // end-match
    // start-group
    groupByProductStage(),
    // end-group
    // start-set
    Stage::set(product_id: Expression::stringFieldPath('_id')),
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
