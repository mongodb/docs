Realm only encrypts the data on the device and stores the data unencrypted in your
Atlas data source. Any users with authorized access to the Atlas data source can read the data, but 
the following still applies: 

- Users must have the correct read :ref:`permissions <flexible-sync-rules-and-permissions>` to read the synced data.
- Data stored in Atlas is always encrypted at a volume (disk) level.
- The transfer between client and server is always fully encrypted.

You can also enable :atlas:`Customer Key Management </security-kms-encryption/>` 
to encrypt stored Atlas data using your cloud provider's key (e.g. AWS KMS,
Azure Key Vault, Google Cloud KMS). 
