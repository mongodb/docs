<?php

require 'vendor/autoload.php';

// start-write-extended
$doc = [
    'foo' => [1, 2],
    'bar' => ['hello' => 'world'],
    'code' => new MongoDB\BSON\Javascript('function x() { return 1; }', []),
    'date' => new DateTime('2024-07-20 10:30:00'),
];

echo 'Relaxed format: ' , MongoDB\BSON\Document::fromPHP($doc)->toRelaxedExtendedJSON(), PHP_EOL;
echo 'Canonical format: ' , MongoDB\BSON\Document::fromPHP($doc)->toCanonicalExtendedJSON(), PHP_EOL;
// end-write-extended

// start-read-extended
$ejsonStr = '{
    "foo": [
        { "$numberInt": "1" },
        { "$numberInt": "2" }
    ],
    "bar": { "hello": "world" },
    "code": {
        "$code": "function x() { return 1; }",
        "$scope": {}
    },
    "bin": { "$binary": { "base64": "AQIDBA==", "subType": "00" } }
}';

$decodedJson = json_decode($ejsonStr, true);
print_r($decodedJson);
// end-read-extended
