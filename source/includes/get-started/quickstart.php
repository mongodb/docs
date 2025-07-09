<?php

require __DIR__ . '/../vendor/autoload.php';


$uri = getenv('MONGODB_URI') ?: throw new RuntimeException(
    'Set the MONGODB_URI environment variable to your Atlas URI',
);
$client = new MongoDB\Client($uri);
$collection = $client->sample_mflix->movies;

$filter = ['title' => 'The Shawshank Redemption'];
$result = $collection->findOne($filter);

if ($result) {
    echo json_encode($result, JSON_PRETTY_PRINT);
} else {
    echo 'Document not found';
}
