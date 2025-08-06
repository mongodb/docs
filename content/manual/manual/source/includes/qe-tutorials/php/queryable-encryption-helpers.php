<?php

namespace MongoDB\Tutorials\QueryableEncryption;

use InvalidArgumentException;
use MongoDB\Client;
use MongoDB\Driver\ClientEncryption;
use MongoDB\Driver\Exception\Exception;
use RuntimeException;

function dropExistingCollection(Client $client, string $databaseName): void
{
    $database = $client->getDatabase($databaseName);
    $database->drop();
}

function getKMSProviderCredentials(string $kmsProviderName): array
{
    switch ($kmsProviderName) {
        case 'aws':
            // start-aws-kms-credentials
            $kmsProviders = [
                'aws' => [
                    'accessKeyId' => getenv('AWS_ACCESS_KEY_ID'), // Your AWS access key ID
                    'secretAccessKey' => getenv('AWS_SECRET_ACCESS_KEY'), // Your AWS secret access key
                ],
            ];
            // end-aws-kms-credentials
            return $kmsProviders;
        case 'azure':
            // start-azure-kms-credentials
            $kmsProviders = [
                'azure' => [
                    'tenantId' => getenv('AZURE_TENANT_ID'), // Your Azure tenant ID
                    'clientId' => getenv('AZURE_CLIENT_ID'), // Your Azure client ID
                    'clientSecret' => getenv('AZURE_CLIENT_SECRET'), // Your Azure client secret
                ],
            ];
            // end-azure-kms-credentials
            return $kmsProviders;
        case 'gcp':
            // start-gcp-kms-credentials
            $kmsProviders = [
                'gcp' => [
                    'email' => getenv('GCP_EMAIL'), // Your GCP email
                    'privateKey' => getenv('GCP_PRIVATE_KEY'), // Your GCP private key
                ],
            ];
            // end-gcp-kms-credentials
            return $kmsProviders;
        case 'kmip':
            // start-kmip-kms-credentials
            $kmsProviders = [
                'kmip' => [
                    'endpoint' => getenv('KMIP_ENDPOINT'), // Your KMIP endpoint
                ],
            ];
            // end-kmip-kms-credentials
            return $kmsProviders;
        case 'local':
            // start-generate-local-key
            if (!file_exists('./customer-master-key.txt')) {
                file_put_contents('./customer-master-key.txt', base64_encode(random_bytes(96)));
            }
            // end-generate-local-key

            // start-get-local-key
            // WARNING: Do not use a local key file in a production application
            $localMasterKey = file_get_contents('./customer-master-key.txt');
            $kmsProviders = [
                'local' => [
                    'key' => $localMasterKey,
                ],
            ];
            // end-get-local-key
            return $kmsProviders;
        case 'aws:my_aws_provider':
            // start-aws-named-kms-credentials
            $kmsProviders = [
                'aws:my_aws_provider' => [
                    'accessKeyId' => getenv('AWS_ACCESS_KEY_ID'), // Your AWS access key ID
                    'secretAccessKey' => getenv('AWS_SECRET_ACCESS_KEY'), // Your AWS secret access key
                ],
            ];
            // end-aws-named-kms-credentials
            return $kmsProviders;
        case 'azure:my_azure_provider':
            // start-azure-named-kms-credentials
            $kmsProviders = [
                'azure:my_azure_provider' => [
                    'tenantId' => getenv('AZURE_TENANT_ID'), // Your Azure tenant ID
                    'clientId' => getenv('AZURE_CLIENT_ID'), // Your Azure client ID
                    'clientSecret' => getenv('AZURE_CLIENT_SECRET'), // Your Azure client secret
                ],
            ];
            // end-azure-named-kms-credentials
            return $kmsProviders;
        case 'gcp:my_gcp_provider':
            // start-gcp-named-kms-credentials
            $kmsProviders = [
                'gcp:my_gcp_provider' => [
                    'email' => getenv('GCP_EMAIL'), // Your GCP email
                    'privateKey' => getenv('GCP_PRIVATE_KEY'), // Your GCP private key
                ],
            ];
            // end-gcp-named-kms-credentials
            return $kmsProviders;
        case 'kmip:my_kmip_provider':
            // start-kmip-named-kms-credentials
            $kmsProviders = [
                'kmip:my_kmip_provider' => [
                    'endpoint' => getenv('KMIP_ENDPOINT'), // Your KMIP endpoint
                ],
            ];
            // end-kmip-named-kms-credentials
            return $kmsProviders;
        default:
            throw new InvalidArgumentException(sprintf('Unrecognized value for KMS provider name. Must be one of: aws, gcp, azure, kmip, or local. Got "%s".', $kmsProviderName));
    }
}

function getCustomerMasterKeyCredentials(string $kmsProviderName): array
{
    switch ($kmsProviderName) {
        case 'aws':
            // start-aws-cmk-credentials
            $customerMasterKeyCredentials = [
                'key' => getenv('AWS_KEY_ARN'), // Your AWS key ARN
                'region' => getenv('AWS_REGION'), // Your AWS region
            ];
            // end-aws-cmk-credentials
            return $customerMasterKeyCredentials;
        case "azure":
            // start-azure-cmk-credentials
            $customerMasterKeyCredentials = [
                'keyVaultEndpoint' => getenv('AZURE_KEY_VAULT_ENDPOINT'), // Your Azure Key Vault Endpoint
                'keyName' => getenv('AZURE_KEY_NAME'), // Your Azure Key Name
            ];
            // end-azure-cmk-credentials
            return $customerMasterKeyCredentials;
        case "gcp":
            // start-gcp-cmk-credentials
            $customerMasterKeyCredentials = [
                'projectId' => getenv('GCP_PROJECT_ID'), // Your GCP Project ID
                'location' => getenv('GCP_LOCATION'), // Your GCP Key Location
                'keyRing' => getenv('GCP_KEY_RING'), // Your GCP Key Ring
                'keyName' => getenv('GCP_KEY_NAME'), // Your GCP Key Name
            ];
            // end-gcp-cmk-credentials
            return $customerMasterKeyCredentials;
        case "kmip":
        case "local":
            // start-kmip-local-cmk-credentials
            $customerMasterKeyCredentials = [];
            // end-kmip-local-cmk-credentials
            return $customerMasterKeyCredentials;
        default:
            throw new InvalidArgumentException(sprintf('Unrecognized value for KMS provider name. Must be one of: aws, gcp, azure, kmip, or local. Got "%s".', $kmsProviderName));
    }
}

function getAutoEncryptionOptions(
    string $kmsProviderName,
    string $keyVaultNamespace,
    array $kmsProviders,
): array
{
    if ($kmsProviderName === 'kmip') {
        $tlsOptions = getKmipTlsOptions();

        // start-kmip-encryption-options
        $autoEncryptionOptions = [
            'keyVaultNamespace' => $keyVaultNamespace,
            'kmsProviders' => $kmsProviders,
            'tlsOptions' => $tlsOptions,
        ];
        // end-kmip-encryption-options
        return $autoEncryptionOptions;
    } else {
        // start-auto-encryption-options
        $autoEncryptionOptions = [
            'keyVaultNamespace' => $keyVaultNamespace,
            'kmsProviders' => $kmsProviders,
        ];
        // end-auto-encryption-options

        return $autoEncryptionOptions;
    }
}

function getKmipTlsOptions(): array
{
    // start-tls-options
    $tlsOptions = [
        'kmip' => [
            'tlsCAFile' => getenv('KMIP_TLS_CA_FILE'), // Path to your TLS CA file
            'tlsCertificateKeyFile' => getenv('KMIP_TLS_CERT_FILE'), // Path to your TLS certificate key file
        ],
    ];
    // end-tls-options
    return $tlsOptions;
}

function getClientEncryption(Client $encryptedClient, array $autoEncryptionOptions): ClientEncryption
{
    // start-client-encryption
    $clientEncryption = $encryptedClient->createClientEncryption($autoEncryptionOptions);
    // end-client-encryption

    return $clientEncryption;
}

function createEncryptedCollection(
    Client $client,
    ClientEncryption $clientEncryption,
    string $encryptedDatabase,
    string $encryptedCollectionName,
    string $kmsProviderName,
    array $encryptedFieldsMap,
    ?array $customerMasterKeyCredentials,
): void
{
    try {
        // start-create-encrypted-collection
        $client->getDatabase($encryptedDatabase)->createEncryptedCollection(
            $encryptedCollectionName,
            $clientEncryption,
            $kmsProviderName,
            $customerMasterKeyCredentials,
            $encryptedFieldsMap,
        );
        // end-create-encrypted-collection
    } catch (Exception $e) {
        throw new RuntimeException(sprintf('Unable to create encrypted collection: %s', $e->getMessage()), 0, $e);
    }
}
