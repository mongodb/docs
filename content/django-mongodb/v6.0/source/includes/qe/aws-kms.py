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
                    'aws': {
                        'accessKeyId': '<AWS Access Key ID>',
                        'secretAccessKey': '<AWS Secret Access Key>',
                    },
                },
                crypt_shared_lib_path='<Automatic Encryption Shared Library path>',
                crypt_shared_lib_required=True,
            )
        },
        'KMS_CREDENTIALS': {
            'aws': {
                'key': '<AWS Key ARN>', 
                'region': '<AWS Key Region>', 
            },
        },
    },
} 