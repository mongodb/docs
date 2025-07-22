<?php

$uri = 'mongodb://localhost:27017';
$uriOptions = ['serverSelectionTimeoutMS' => 10000];

$client = new MongoDB\Client($uri, $uriOptions);
