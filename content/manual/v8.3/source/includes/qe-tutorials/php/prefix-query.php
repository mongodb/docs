<?php

// start-enable-prefix
$collectionOpts = [
    'encryptedFields' => [
        'fields' => [
            [
                'path' => 'patientRecord.ssn',
                'bsonType' => 'string',
                'queries' => [
                    'queryType' => 'prefixPreview',
                    'strMinQueryLength' => 3,
                    'strMaxQueryLength' => 10,
                    'caseSensitive' => true,
                    'diacriticSensitive' => true,
                ],
                'keyId' => null,
            ],
        ],
    ],
];
// end-enable-prefix

// start-query-prefix
$findResult = $encryptedCollection->findOne([
    '$expr' => [
        '$encStrStartsWith' => [
            'input' => '$patientRecord.ssn',
            'prefix' => '987',
        ],
    ],
]);
print_r($findResult);
// end-query-prefix
