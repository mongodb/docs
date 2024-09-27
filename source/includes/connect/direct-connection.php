<?php

// Replace the placeholders with your actual hostname and port
$uri = 'mongodb://<hostname>:<port>/?directConnection=true';

// Create a MongoDB client
$client = new MongoDB\Client($uri);