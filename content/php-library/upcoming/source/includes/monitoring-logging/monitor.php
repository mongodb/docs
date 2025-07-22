<?php

require __DIR__ . '/vendor/autoload.php';

use Monitor\MyCommandSubscriber;
use Monitor\MySdamSubscriber;

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your connection URI');
$client = new MongoDB\Client($uri);

$collection = $client->db->my_coll;

// start-add-subs
$commandSub = new MyCommandSubscriber(STDERR);
$sdamSub = new MySDAMSubscriber(STDERR);

$client->addSubscriber($commandSub);
$client->addSubscriber($sdamSub);
// end-add-subs

$collection->insertOne(['x' => 100]);

// start-remove-sub
$client->removeSubscriber($commandSub);
// end-remove-sub
