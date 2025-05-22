The :binary:`~bin.mongosh` client-side field level and queryable 
encryption methods require a database connection configured for 
client-side encryption. If the current database connection was not 
initiated with client-side field level encryption enabled, either:

- Use the :method:`Mongo()` constructor from the ``mongosh``
  to establish a connection with the required client-side field
  level encryption options. The ``Mongo()`` method supports the
  following Key Management Service (KMS) providers for Customer
  Master Key (CMK) management:

  - :ref:`Amazon Web Services KMS <field-level-encryption-aws-kms>`
  - :ref:`Azure Key Vault <field-level-encryption-azure-keyvault>`
  - :ref:`Google Cloud Platform KMS <field-level-encryption-gcp-kms>`
  - :ref:`Locally Managed Key <field-level-encryption-local-kms>`

*or*

- Use the ``mongosh`` :ref:`command line options
  <mongosh-client-side-field-level-encryption-options>` to establish a
  connection with the required options. The command line options only
  support the :ref:`Amazon Web Services KMS
  <field-level-encryption-aws-kms>` provider for CMK management. 
