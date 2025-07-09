<?php

require 'vendor/autoload.php';

use Bson\Person;
use Bson\Role;
use Bson\User;

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your Atlas URI that connects to the sample dataset');
$client = new MongoDB\Client($uri);
$db = $client->test;

// start-create-doc
$document = [
    'address' => [
        'street' => 'Pizza St',
        'zipcode' => '10003',
    ],
    'coord' => [-73.982419, 41.579505],
    'cuisine' => 'Pizza',
    'name' => 'Planet Pizza',
];
// end-create-doc

// start-modify-doc
$document['restaurant_id'] = 12345;
$document['name'] = 'Galaxy Pizza';
// end-modify-doc

// start-type-map
$options = [
    'typeMap' => [
        'array' => 'MongoDB\Model\BSONDocument',
        'root' => 'MongoDB\Model\BSONDocument',
        'document' => 'MongoDB\Model\BSONDocument',
    ],
];

$db->createCollection('restaurants', $options);
// end-type-map

// start-person-serialize
$collection = $client->test->persons;
$result = $collection->insertOne(new Person('Bob'));
$person = $collection->findOne(['_id' => $result->getInsertedId()]);

var_dump($person);
// end-person-serialize

// start-enum-serialize
$collection = $client->test->users;
$result = $collection->insertOne(new User('alice', Role::USER));
$person = $collection->findOne(['_id' => $result->getInsertedId()]);

var_dump($person);
// end-enum-serialize
