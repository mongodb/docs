<?php

require 'vendor/autoload.php';

use MongoDB\Client;
use MongoDB\BSON\UTCDateTime;
use MongoDB\Builder\Pipeline;
use MongoDB\Builder\Stage;
use MongoDB\Builder\Type\Sort;

$uri = '<connection string>';
$client = new Client($uri);

// start-insert-persons
$persons = $client->agg_tutorials_db->persons;
$persons->deleteMany([]);

$persons->insertMany(
    [
        [
            'person_id' => '6392529400',
            'firstname' => 'Elise',
            'lastname' => 'Smith',
            'dateofbirth' => new UTCDateTime(new DateTimeImmutable('1972-01-13T09:32:07')),
            'vocation' => 'ENGINEER',
            'address' => ['number' => 5625, 'Street' => 'Tipa Circle', 'city' => 'Wojzinmoj'],
        ],
        [
            'person_id' => '1723338115',
            'firstname' => 'Olive',
            'lastname' => 'Ranieri',
            'gender' => "FEMALE",
            'dateofbirth' => new UTCDateTime(new DateTimeImmutable('1985-05-12T23:14:30')),
            'vocation' => 'ENGINEER',
            'address' => ['number' => 9303, 'street' => 'Mele Circle', 'city' => 'Tobihbo'],
        ],
        [
            'person_id' => '8732762874',
            'firstname' => 'Toni',
            'lastname' => 'Jones',
            'dateofbirth' => new UTCDateTime(new DateTimeImmutable('1991-11-23T16:53:56')),
            'vocation' => 'POLITICIAN',
            'address' => ['number' => 1, 'street' => 'High Street', 'city' => 'Upper Abbeywoodington'],
        ],
        [
            'person_id' => '7363629563',
            'firstname' => 'Bert',
            'lastname' => 'Gooding',
            'dateofbirth' => new UTCDateTime(new DateTimeImmutable('1941-04-07T22:11:52')),
            'vocation' => 'FLORIST',
            'address' => ['number' => 13, 'street' => 'Upper Bold Road', 'city' => 'Redringtonville'],
        ],
        [
            'person_id' => '1029648329',
            'firstname' => 'Sophie',
            'lastname' => 'Celements',
            'dateofbirth' => new UTCDateTime(new DateTimeImmutable('1959-07-06T17:35:45')),
            'vocation' => 'ENGINEER',
            'address' => ['number' => 5, 'street' => 'Innings Close', 'city' => 'Basilbridge'],
        ],
        [
            'person_id' => '7363626383',
            'firstname' => 'Carl',
            'lastname' => 'Simmons',
            'dateofbirth' => new UTCDateTime(new DateTimeImmutable('1998-12-26T13:13:55')),
            'vocation' => 'ENGINEER',
            'address' => ['number' => 187, 'street' => 'Hillside Road', 'city' => 'Kenningford'],
        ]
    ]
);
// end-insert-persons


$pipeline = new Pipeline(
    // start-match
    Stage::match(vocation: 'ENGINEER'),
    // end-match
    // start-sort
    Stage::sort(dateofbirth: Sort::Desc),
    // end-sort
    // start-limit
    Stage::limit(3),
    // end-limit
    // start-unset
    Stage::unset('_id', 'address')
    // end-unset
);

// start-run-agg
$cursor = $persons->aggregate($pipeline);
// end-run-agg

foreach ($cursor as $doc) {
    echo json_encode($doc, JSON_PRETTY_PRINT), PHP_EOL;
}
