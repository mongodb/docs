<?php

require __DIR__ . '/../vendor/autoload.php';

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your Atlas URI that connects to the sample dataset');
$client = new MongoDB\Client($uri);

$database = $client->sample_mflix;
$collection = $database->movies;

// start-list-indexes
foreach ($collection->listIndexes() as $indexInfo) {
    echo $indexInfo;
}
// end-list-indexes

// start-remove-index
$collection->dropIndex('_title_');
// end-remove-index

// start-remove-all-indexes
$collection->dropIndexes();
// end-remove-all-indexes

// start-index-single
$indexName = $collection->createIndex(['title' => 1]);
// end-index-single

// start-index-single-query
$document = $collection->findOne(['title' => 'Sweethearts']);
echo json_encode($document), PHP_EOL;
// end-index-single-query

// start-index-compound
$indexName = $collection->createIndex(
    ['title' => 1, 'year' => 1]
);
// end-index-compound

// start-compound-query
$document = $collection->findOne(
    ['title' => ['$regex' => 'Sunrise'],
    'year' => ['$gte' => 1990]]
);
echo json_encode($document), PHP_EOL;
// end-compound-query

// start-multikey
$indexName = $collection->createIndex(['cast' => 1]);
// end-multikey

// start-index-array-query
$document = $collection->findOne(
    ['cast' => ['$in' => ['Aamir Khan', 'Kajol']]]
);
echo json_encode($document), PHP_EOL;
// end-index-array-query

// start-create-search-index
$searchIndexName = $collection->createSearchIndex(
    ['mappings' => ['dynamic' => true]],
    ['name' => 'mySearchIdx']
);
// end-create-search-index

// start-create-vector-index
$vectorSearchIndexName = $collection->createSearchIndex(
    [
        'fields' => [[
            'type' => 'vector',
            'path' => 'plot_embedding',
            'numDimensions' => 1536,
            'similarity' => 'dotProduct'
        ]]
    ],
    ['name' => 'myVSidx', 'type' => 'vectorSearch']
);
// end-create-vector-index

// start-create-multiple-indexes
$indexNames = $collection->createSearchIndexes(
	[
		[
			'name' => 'SearchIdx',
			'definition' => ['mappings' => ['dynamic' => true]],
		],
		[
			'name' => 'VSidx',
			'type' => 'vectorSearch',
			'definition' => [
				'fields' => [[
					'type' => 'vector',
					'path' => 'plot_embedding',
					'numDimensions' => 1536,
					'similarity' => 'dotProduct'
				]]
			],
		],
	]
);
// end-create-multiple-indexes

// start-list-search-indexes
foreach ($collection->listSearchIndexes() as $indexInfo) {
    echo json_encode($indexInfo), PHP_EOL;
}
// end-list-search-indexes

// start-update-search-indexes
$collection->updateSearchIndex(
    'mySearchIdx',
    ['mappings' => [
        'dynamic' => false,
        'fields' => [
            'title' => [
                'type' => 'string',
                'analyzer' => 'lucene.simple'
            ]
        ]
    ]]
);
// end-update-search-indexes

// start-delete-search-index
$collection->dropSearchIndex('mySearchIdx');
// end-delete-search-index