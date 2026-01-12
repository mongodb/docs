.. list-table::
   :widths: 30,70
   :header-rows: 1

   * - Name

     - Description

   * - :method:`getKeyVault()`

     - Returns the key vault object for the current MongoDB connection.

   * - :method:`KeyVault.createDataKey()`

     - An alias for :method:`KeyVault.createKey()`. 

   * - :method:`KeyVault.createKey()`

     - Creates a data encryption key for use with client-side field level encryption.

   * - :method:`KeyVault.deleteKey()`

     - Deletes the specified data encryption key from the key vault.

   * - :method:`KeyVault.getKey()`

     - Retrieves the specified data encryption key from the key vault.

   * - :method:`KeyVault.getKeys()`

     - Retrieves all keys in the key vault.

   * - :method:`KeyVault.addKeyAlternateName()`

     - Associates a key's alternative name to the specified data encryption key.

   * - :method:`KeyVault.addKeyAltName()`

     - An alias for :method:`KeyVault.addKeyAlternateName()`. 

   * - :method:`KeyVault.removeKeyAlternateName()`

     - Removes a key's alternative name from the specified data encryption key.

   * - :method:`KeyVault.removeKeyAltName()`

     - An alias for :method:`KeyVault.removeKeyAlternateName()`. 

   * - :method:`KeyVault.getKeyByAltName()`

     - Retrieves keys with the specified key alternative name.

   * - :method:`KeyVault.rewrapManyDataKey()`

     - Decrypts multiple data keys and re-encrypts them. 

   * - :method:`getClientEncryption()`

     - Returns the client encryption object for supporting explicit encryption/decryption of fields.

   * - :method:`ClientEncryption.createEncryptedCollection()`

     - Creates a collection with encrypted fields.

   * - :method:`ClientEncryption.encrypt()`

     - Encrypts a field using a specified data encryption key and encryption algorithm.

   * - :method:`ClientEncryption.decrypt()`

     - Decrypts a field using the associated data encryption key and encryption algorithm.