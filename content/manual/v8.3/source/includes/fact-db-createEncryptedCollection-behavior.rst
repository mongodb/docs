The :method:`db.createEncryptedCollection()` method runs in the context
of the current ``db`` and uses the same Queryable Encryption-enabled
connection as the current ``mongosh`` session. Internally, it calls
:method:`ClientEncryption.createEncryptedCollection()` with the current
database name, the specified collection name, and the provided options
document.

When ``options.createCollectionOptions.encryptedFields.fields[*].keyId``
is ``null`` or omitted, the method automatically creates the required
data keys in the key vault and populates the corresponding ``keyId``
values in the created collection's ``encryptedFields`` definition.
