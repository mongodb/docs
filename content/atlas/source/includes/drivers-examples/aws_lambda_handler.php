<?php
// Start AWS Lambda Example 1
require 'vendor/autoload.php';

use MongoDB\Client;

// Create the MongoDB client outside the handler function
$client = new Client(getenv('MONGODB_URI'));

function handler($event, $context) {
    global $client;
    
    $database = $client->getDatabase('admin');
    $result = $database->command(['ping' => 1]);
    
    return [
        'statusCode' => 200,
        'body' => json_encode($result)
    ];
}
// End AWS Lambda Example 1

