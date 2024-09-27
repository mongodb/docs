<?php

require __DIR__ . '/../vendor/autoload.php';

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your Atlas URI that connects to the sample dataset');
$client = new MongoDB\Client($uri);

$database = $client->sample_db;
$collection = $database->sample_coll;

// start-to-json
function toJSON(object $document): string
{
    return MongoDB\BSON\Document::fromPHP($document)->toRelaxedExtendedJSON();
}
// end-to-json

// start-single-field
$indexName = $collection->createIndex(['<field name>' => 1]);
// end-single-field

// start-compound
$indexName = $collection->createIndex(
    ['<field name 1>' => 1, '<field name 2>' => 1]
);
// end-compound

// start-multikey
$indexName = $collection->createIndex(['<array field name>' => 1]);
// end-multikey

// start-search-create
$indexName = $collection->createSearchIndex(
    ['mappings' => ['dynamic' => true]],
    ['name' => '<Search index name>']
);
// end-search-create

// start-search-list
foreach ($collection->listSearchIndexes() as $indexInfo) {
    echo toJSON($indexInfo), PHP_EOL;
}
// end-search-list

// start-search-update
$collection->updateSearchIndex(
    '<Search index name>',
    ['mappings' => [
        'dynamic' => false,
        'fields' => [
            '<string field name>' => [
                'type' => 'string',
                'analyzer' => 'lucene.standard'
            ]
        ]
    ]]
 );
// end-search-update

// start-search-delete
$collection->dropSearchIndex('<Search index name>');
// end-search-delete

// start-text
$indexName = $collection->createIndex(['<field name>' => 'text']);
// end-text

// start-geo
$indexName = $collection->createIndex(
    [ '<GeoJSON object field>' => '2dsphere']
);
// end-geo

// start-unique
$indexName = $collection->createIndex(['<field name>' => 1], ['unique' => true]);
// end-unique

// start-wildcard
$indexName = $collection->createIndex(['$**' => 1]);
// end-wildcard

// start-clustered
$options = [
    'clusteredIndex' => [
        'key' => ['_id' => 1],
        'unique' => true
    ]
];

$database->createCollection('<collection name>', $options);
// end-clustered

// start-list
foreach ($collection->listIndexes() as $indexInfo) {
    echo $indexInfo;
}
// end-list

// start-remove
$collection->dropIndex('<index name>');
// end-remove