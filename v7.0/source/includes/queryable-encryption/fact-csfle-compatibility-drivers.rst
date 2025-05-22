While {+qe+} does not support encrypting
individual array elements, randomized encryption supports encrypting the
*entire* array field rather than individual elements in the field. The
example automatic encryption rules specify randomized encryption for the
``medicalRecords`` field to encrypt the entire array. If the automatic
encryption rules specified :autoencryptkeyword:`encrypt` or
:autoencryptkeyword:`encryptMetadata` within ``medicalRecords.items`` or
``medicalRecords.additionalItems``, automatic field level encryption
fails and returns an errors.

The official MongoDB drivers, :binary:`~bin.mongosh`, and the legacy ``mongo`` 
shell require specifying the automatic encryption rules as part of creating the 
database connection object:

- For ``mongosh``, use the :method:`Mongo()`
  constructor to create a database connection. Specify the automatic
  encryption rules to the ``schemaMap`` key of the
  :ref:`{+auto-encrypt-options+}` parameter. See
  :ref:`mongo-connection-automatic-client-side-encryption-enabled`
  for a complete example.

- For the official MongoDB drivers, use the driver-specific database connection 
  constructor (``MongoClient``) to create the database connection with the 
  automatic encryption rules included as part of the {+qe+}
  configuration object. Defer to the :ref:`driver API reference
  <field-level-encryption-drivers>` for more complete documentation and
  tutorials.

For all clients, the ``keyVault`` and ``kmsProviders`` specified
to the {+qe+} parameter *must* grant
access to both the {+dek-long+}s specified in the automatic
encryption rules *and* the {+cmk-long+} used to encrypt the
{+dek-long+}s.
