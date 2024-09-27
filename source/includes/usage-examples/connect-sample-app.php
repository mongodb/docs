<?php

require __DIR__ . '/../vendor/autoload.php';

// Start example code here

// End example code here

try {
    $client->test->command(['ping' => 1]);
    echo 'Successfully pinged the MongoDB server.', PHP_EOL;
} catch (MongoDB\Driver\Exception\RuntimeException $e) {
    printf("Failed to ping the MongoDB server: %s\n", $e->getMessage());
}
