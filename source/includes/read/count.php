<?php
require 'vendor/autoload.php';

use MongoDB\BSON\Document;

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your Atlas URI that connects to the sample dataset');
$client = new MongoDB\Client($uri);

// start-db-coll
$collection = $client->sample_training->companies;
// end-db-coll

// Counts all documents in the collection
// start-count-all
$result = $collection->countDocuments([]);
echo 'Number of documents: ', $result;
// end-count-all

// Counts documents that have a "founded_year" value of 2010
// start-count-accurate
$result = $collection->countDocuments(['founded_year' => 2010]);
echo 'Number of companies founded in 2010: ', $result;
// end-count-accurate

// Counts a maximum of 100 documents that have a "number_of_employees" value of 50
// start-modify-accurate
$result = $collection->countDocuments(
    ['number_of_employees' => 50],
    ['limit' => 100]
);
echo 'Number of companies with 50 employees: ', $result;
// end-modify-accurate

// Estimates the number of documents in the collection
// start-count-estimate
$result = $collection->estimatedDocumentCount();
echo 'Estimated number of documents: ', $result;
// end-count-estimate

// Estimates the number of documents in the collection and sets a time limit on the operation
// start-modify-estimate
$result = $collection->estimatedDocumentCount(['maxTimeMS' => 1000]);
echo 'Estimated number of documents: ', $result;
// end-modify-estimate
