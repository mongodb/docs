<?php

require __DIR__ . '/vendor/autoload.php';

use MongoDB\Client;

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your connection URI');
$client = new MongoDB\Client($uri);

// start-hello
$database = $client->getDatabase('myDB');
$cursor = $database->command(['hello' => 1]);
// end-hello

// start-readpref
$readPref = new MongoDB\Driver\ReadPreference('primaryPreferred');
$cursor = $database->command(
    ['hello' => 1], 
    ['readPreference' => $readPref]
);
// end-readpref

// start-runcommand
$database = $client->accounts;
$command = ['dbStats' => 1];

// dbStats returns a single document
$cursor = $database->command($command);

// Print the first document in the cursor
echo json_encode($cursor->toArray()[0]), PHP_EOL;
// end-runcommand
