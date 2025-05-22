If you omit ``keyVaultClient`` or set ``bypassAutomaticEncryption`` to
false in your ``AutoEncryptionSettings`` object, the driver creates a
separate, internal ``MongoClient``. The internal ``MongoClient``
configuration differs from the parent ``MongoClient`` by setting the
``minPoolSize`` to  0 and omitting the ``AutoEncryptionSettings``.