Commands with aliases are grouped together.

.. list-table::
   :widths: 40,6,6,48
   :header-rows: 1

   * - Name
     - CSFLE
     - QE
     - Description

   * - :method:`getKeyVault()`
     - ✓
     - ✓
     - Returns the key vault object for the current MongoDB connection.

   * - | :method:`KeyVault.createKey()`
       | :method:`KeyVault.createDataKey()`
     - ✓
     - ✓
     - Creates a data encryption key for use with {+csfle+}.

   * - :method:`KeyVault.deleteKey()`
     - ✓
     - ✓
     - Deletes the specified data encryption key from the key vault.

   * - :method:`KeyVault.getKey()`
     - ✓
     - ✓
     - Retrieves the specified data encryption key from the key vault.

   * - :method:`KeyVault.getKeys()`
     - ✓
     - ✓
     - Retrieves all keys in the key vault.

   * - | :method:`KeyVault.addKeyAlternateName()`
       | :method:`KeyVault.addKeyAltName()`
     - ✓
     - ✓
     - Associates a key alternative name to the specified data encryption key.

   * - | :method:`KeyVault.removeKeyAlternateName()`
       | :method:`KeyVault.removeKeyAltName()`
     - ✓
     - ✓
     - Removes a key alternative name from the specified data encryption key.

   * - :method:`KeyVault.getKeyByAltName()`
     - ✓
     - ✓
     - Retrieves keys with the specified key alternative name.
   
   * - :method:`KeyVault.rewrapManyDataKey()`
     - ✓
     - ✓
     - Decrypts multiple data keys and re-encrypts them with a new master key. 

   * - :method:`getClientEncryption()`
     - ✓
     - ✓
     - Returns the client encryption object for supporting explicit encryption/decryption of fields.

   * - :method:`ClientEncryption.createEncryptedCollection()`
     - ✓
     - ✓
     - Creates a collection with encrypted fields.

   * - :method:`ClientEncryption.encrypt()`
     - ✓
     - ✓
     - Encrypts a field using a specified data encryption key and encryption
       algorithm.
     
   * - :method:`ClientEncryption.encryptExpression()`
     -
     - ✓
     - Encrypts a query expression using a specified data encryption key and
       encryption options.
     
   * - :method:`ClientEncryption.decrypt()`
     - ✓
     - ✓
     - Decrypts a field using the associated data encryption key and 
       encryption algorithm.