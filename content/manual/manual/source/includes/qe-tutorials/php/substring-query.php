<?php

// start-enable-substring
$collectionOpts = [
    'encryptedFields' => [
        'fields' => [
            [
                'path' => 'patientRecord.ssn',
                'bsonType' => 'string',
                'queries' => [
                    'queryType' => 'substringPreview',
                    'strMaxLength' => 12,
                    'strMinQueryLength' => 3,
                    'strMaxQueryLength' => 6,
                    'caseSensitive' => true,
                    'diacriticSensitive' => true,
                ],
                'keyId' => null,
            ],
        ],
    ],
];
// end-enable-substring

// start-query-substring
$findResult = $encryptedCollection->findOne([
    '$expr' => [
        '$encStrContains' => [
            'input' => '$patientRecord.ssn',
            'substring' => '-65-4',
        ],
    ],
]);
print_r($findResult);
// end-query-substring
