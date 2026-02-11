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
                    'gcp': {
                        'email': '<GCP Service Account Email>',
                        'privateKey': '<GCP Service Account Private Key>',
                    },
                },
                crypt_shared_lib_path='<Automatic Encryption Shared Library path>',
                crypt_shared_lib_required=True,
            )
        },
        'KMS_CREDENTIALS': {
            'gcp': {
                'projectId': '<GCP Project ID>',
                'location': '<GCP Key Ring Location>',
                'keyRing': '<GCP Key Ring Name>',
                'keyName': '<GCP Key Name>',
            },
        },
    },
}