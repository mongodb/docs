.. list-table::
   :widths: 20 14 66
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - keyVault
     - object
     - Vault-backed credential source for this |s3ss|.
       |onprem| returns this object only when the snapshot store reads
       its credentials from a key vault.

   * - keyVault.vaultId
     - string
     - Unique identifier of the key vault configuration that stores the
       credentials.

   * - keyVault.awsAccessKeyPath
     - string
     - Path in the key vault to the |aws| access key.

   * - keyVault.awsSecretKeyPath
     - string
     - Path in the key vault to the |aws| secret key.
