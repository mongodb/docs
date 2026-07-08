By default, |service| encrypts all {+cluster+} storage and snapshot
volumes at rest using Advanced Encryption Standard (AES)-256.
Your cloud provider automates this disk encryption and manages the
encryption keys. You can add another layer of security by enabling
database-level Encryption at Rest with Customer-Managed Keys. You
own and control the encryption keys, which are stored in your cloud
provider's |kms|.