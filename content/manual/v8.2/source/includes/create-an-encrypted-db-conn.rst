The :binary:`~bin.mongosh` client-side field level and queryable 
encryption methods require a database connection configured for 
client-side encryption. If the current database connection was not 
initiated with client-side field level encryption enabled, either:

- Use the :method:`Mongo()` constructor from the ``mongosh``
  to establish a connection with the required client-side field
  level encryption options. The ``Mongo()`` method supports the
  following Key Management Service (KMS) providers for Customer
  Master Key (CMK) management:

  - :ref:`Amazon Web Services KMS <qe-fundamentals-kms-providers-aws>`
  - :ref:`Azure Key Vault <qe-fundamentals-kms-providers-azure>`
  - :ref:`Google Cloud Platform KMS <qe-fundamentals-kms-providers-gcp>`
  - :ref:`Locally Managed Key <qe-fundamentals-kms-providers-local>`

*or*

- Use the ``mongosh`` :ref:`command line options
  <mongosh-client-side-field-level-encryption-options>` to establish a
  connection with the required options. The command line options only
  support the :ref:`Amazon Web Services KMS
  <qe-fundamentals-kms-providers-aws>` provider for CMK management. 
