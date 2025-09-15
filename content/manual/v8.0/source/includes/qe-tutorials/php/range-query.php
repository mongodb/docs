<?php

// start-enable-range
$encryptedFieldsMap = [
    'encryptedFields' => [
        'fields' => [
            [
                'path' => 'patientRecord.ssn',
                'bsonType' => 'string',
                'queries' => ['queryType' => 'equality'],
                'keyId' => null,
            ],
            [
                'path' => 'patientRecord.billing',
                'bsonType' => 'object',
                'keyId' => null,
            ],
            [
                'path' => 'patientRecord.billAmount',
                'bsonType' => 'int',
                'queries' => [
                    'queryType' => 'range',
                    'sparsity' => 1,
                    'trimFactor' => 4,
                    'min' => 100,
                    'max' => 2000,
                ],
                'keyId' => null,
            ],
        ],
    ],
];
// end-enable-range

// start-query-range
$findResult = $encryptedCollection->findOne([
    'patientRecord.billAmount' => ['$gt' => 1000, '$lt' => 2000],
]);
print_r($findResult);
// end-query-range
