<?php

namespace MongoDB\Tutorials\QueryableEncryption;

use MongoDB\Exception\RuntimeException;
use Symfony\Component\Dotenv\Dotenv;

require __DIR__.'/vendor/autoload.php';
require __DIR__.'/queryable-encryption-helpers.php';

(new Dotenv())->usePutenv()->loadEnv(__DIR__.'/.env');

// start-setup-application-variables
$kmsProviderName = getenv('KMS_PROVIDER');

$uri = getenv('MONGODB_URI'); // Your connection URI

$keyVaultDatabaseName = 'encryption';
$keyVaultCollectionName = '__keyVault';
$keyVaultNamespace = $keyVaultDatabaseName . '.' . $keyVaultCollectionName;
$encryptedDatabaseName = 'medicalRecords';
$encryptedCollectionName = 'patients';
// end-setup-application-variables

$kmsProviderCredentials = getKMSProviderCredentials($kmsProviderName);
$customerMasterKeyCredentials = getCustomerMasterKeyCredentials($kmsProviderName);

$autoEncryptionOptions = getAutoEncryptionOptions(
    $kmsProviderName,
    $keyVaultNamespace,
    $kmsProviderCredentials
);

// start-create-client
$encryptedClient = new \MongoDB\Client($uri, [], [
    'autoEncryption' => $autoEncryptionOptions,
]);
// end-create-client

dropExistingCollection($encryptedClient, $encryptedDatabaseName);
dropExistingCollection($encryptedClient, $keyVaultDatabaseName);

// start-encrypted-fields-map
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
        ],
    ],
];
// end-encrypted-fields-map

$clientEncryption = getClientEncryption(
    $encryptedClient,
    $autoEncryptionOptions
);

createEncryptedCollection(
    $encryptedClient,
    $clientEncryption,
    $encryptedDatabaseName,
    $encryptedCollectionName,
    $kmsProviderName,
    $encryptedFieldsMap,
    $customerMasterKeyCredentials
);

// start-insert-document
$patientDocument = [
    'patientName' => 'Jon Doe',
    'patientId' => 12345678,
    'patientRecord' => [
        'ssn' => '987-65-4320',
        'billing' => [
            'type' => 'Visa',
            'number' => '4111111111111111',
        ],
        'billAmount' => 1500,
    ],
];

$encryptedCollection = $encryptedClient
    ->getDatabase($encryptedDatabaseName)
    ->getCollection($encryptedCollectionName);

$result = $encryptedCollection->insertOne($patientDocument);
// end-insert-document

if ($result->isAcknowledged()) {
    echo "Successfully inserted the patient document.\n";
}

// start-find-document
$findResult = $encryptedCollection->findOne([
    'patientRecord.ssn' => '987-65-4320',
]);

print_r($findResult);
// end-find-document
