<?php
require 'vendor/autoload.php';

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your Atlas URI that connects to the sample dataset');
$client = new MongoDB\Client($uri);
$collection = $client->db->coll;
$anotherCollection = $client->db->collection;

// Inserts one document that stores the specified values
// start-insert-one
$result = $collection->insertOne([
    '<field name 1>' => '<value 1>',
    '<field name 2>' => '<value 2>',
]);
// end-insert-one

// Inserts multiple documents that store the specified values
// start-insert-multiple
$result = $collection->insertMany(
    [
        '<field name 1>' => '<value 1>',
        '<field name 2>' => '<value 2>',
    ],
    [
        '<field name 1>' => '<value 1>',
        '<field name 2>' => '<value 2>',
    ],
);
// end-insert-multiple

// Updates a document that matches the specified criteria
// start-update-one
$result = $collection->updateOne(
    ['<field to match>' => '<value to match>'],
    ['$set' => ['<field name>' => '<value>']],
);
// end-update-one

// Updates all documents that match the specified criteria
// start-update-multiple
$result = $collection->updateMany(
    ['<field to match>' => '<value to match>'],
    ['$set' => ['<field name>' => '<value>']],
);
// end-update-multiple

// start-replace-one
$result = $collection->replaceOne(
    ['<field to match>' => '<value to match>'],
    [
        '<new field 1>' => '<value 1>',
        '<new field 2>' => '<value 2>',
    ],
);
// end-replace-one

// Deletes a document that matches the specified criteria
// start-delete-one
$result = $collection->deleteOne(['<field name>' => '<value>']);
// end-delete-one

// Deletes all documents that match the specified criteria
// start-delete-multiple
$result = $collection->deleteMany(['<field name>' => '<value>']);
// end-delete-multiple

// Runs a bulk operation based on the operations in the ClientBulkWrite object
// start-bulk-write
$bulkWrite = MongoDB\ClientBulkWrite::createWithCollection($collection);

$bulkWrite->insertOne(['<field name 1>' => '<value 1>', '<field name 2>' => '<value 2>']);

$bulkWrite->updateOne(
    ['<field to match>' => '<value to match>'],
    ['$set' => ['<field to update>' => '<updated value>']],
);

$bulkWrite = $bulkWrite->withCollection($anotherCollection);

$bulkWrite->deleteMany(
    ['<field name>' => '<value>'],
);

$bulkWrite->replaceOne(
    ['<field to match>' => '<value to match>'],
    ['<replacement field 1>' => '<replacement value 1>', '<replacement field 2>' => '<replacement value 2>'],
);

$result = $client->bulkWrite($bulkWrite);
// end-bulk-write

// Stores a file in a GridFS bucket and writes data to the file
// start-gridfs-upload
$bucket = $client->getDatabase('<database name>')->selectGridFSBucket();
$stream = $bucket->openUploadStream('<file name>');
fwrite($stream, '<data>');
fclose($stream);
// end-gridfs-upload
