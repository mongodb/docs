DATABASES = {
    'default': {
        # ... Your default configuration
    },
    'encrypted': {
        'ENGINE': 'django_mongodb_backend',
        'HOST': '<connection string>',
        'NAME': 'medical_records',
        # ...
        'OPTIONS': {
            'auto_encryption_opts': AutoEncryptionOpts(
                key_vault_namespace='medical_records.__keyVault',
                kms_providers={
                    'azure': {
                        'tenantId': '<Azure Tenant ID>',
                        'clientId': '<Azure Client ID>',
                        'clientSecret': '<Azure Client Secret>',
                    },
                },
                crypt_shared_lib_path='<Automatic Encryption Shared Library path>',
                crypt_shared_lib_required=True,
            )
        },
        'KMS_CREDENTIALS': {
            'azure': {
                'keyVaultEndpoint': '<Azure Key Vault Endpoint>',
                'keyName': '<Azure Key Name>',
                # Optional: 'keyVersion': '<Azure Key Version>',
            },
        },
    },
}