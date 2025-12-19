To add a {+dek-abbr+} to your {+key-vault-long+}, use the ``createKey`` method of a
``ClientEncryption`` object.

To delete or update a {+dek-abbr+}, use one of the following mechanisms:

- The ``rewrapManyDataKey`` method
- Standard :ref:`CRUD <crud>` operations 

To learn more about the ``rewrapManyDataKey`` method, see the documentation
of the method for your client or driver:

- :ref:`MongoDB Shell <server-keyvault-rewrap-manydatakey-method>`
- `{+pymongo+} <{+pymongo-api-docs+}/pymongo/encryption.html#pymongo.encryption.ClientEncryption.rewrap_many_data_key>`__
- `{+node-driver-full+} <{+node-libmongocrypt-binding-docs+}/node#RewrapManyDataKeyResult>`__
- `{+csharp-driver-full+} <https://mongodb.github.io/mongo-csharp-driver/2.22/html/M_MongoDB_Driver_Encryption_ClientEncryption_RewrapManyDataKey.htm>`__
- `{+java-driver-full+} <https://mongodb.github.io/mongo-java-driver/4.9/apidocs/mongodb-driver-core/com/mongodb/client/model/vault/RewrapManyDataKeyOptions.html>`__
- `{+go-driver-full+} <{+go-api-docs+}/mongo#ClientEncryption.RewrapManyDataKey>`__

.. tip:: mongosh Specific Features

   :binary:`~bin.mongosh` provides the following additional
   methods for working with your {+key-vault-long+}:

   - :method:`getKeyVault()`
   - :method:`KeyVault.getKey()`
   - :method:`KeyVault.getKeys()`
   - :method:`KeyVault.getKeyByAltName()`
   - :method:`KeyVault.createKey()`
   - :method:`KeyVault.rewrapManyDataKey()`
   - :method:`KeyVault.addKeyAlternateName()`
   - :method:`KeyVault.removeKeyAlternateName()`