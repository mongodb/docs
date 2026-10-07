The following table describes the structure of an ``AutoEncryptionOptions`` object:

.. list-table::
   :header-rows: 1
   :widths: 25 10 10 55

   * - Property

     - Data Type

     - Required?

     - Description

   * - ``keyVaultNamespace``

     - ``String``

     - Yes

     - The full :term:`namespace` of the {+key-vault-long+}.

   * - ``kmsProviders``

     - ``Object``

     - Yes

     - The {+kms-long+} (KMS) used by {+qe+} for
       managing your {+cmk-long+}s (CMKs).

       To learn more about ``kmsProviders`` objects, see
       :ref:`qe-fundamentals-kms-providers`.

       To learn more about {+cmk-long+}s, see :ref:`qe-reference-keys-key-vaults`.
  
   * - ``bypassAutoEncryption``

     - ``Boolean``

     - No

     - Specify ``true`` to bypass automatic encryption rules and perform
       explicit (manual) per-field encryption.

   * - ``bypassQueryAnalysis``

     - ``Boolean``

     - No

     - Disables automatic analysis of outgoing commands. Specify ``true``
       to use explicit encryption without the
       {+shared-library+}.

   * - ``encryptedFieldsMap``

     - ``Object``

     - No

     - A schema that specifies which fields to automatically encrypt and the types
       of queries allowed on those fields.

       To learn how to construct an encryption schema, see
       :ref:`qe-fundamentals-encrypt-query`.

   * - ``explicitEncryptionOnly``

     - ``Boolean``

     - No

     - If you set ``explicitEncryptionOnly`` to ``true``, the driver uses
       only explicit (manual) per-field encryption and removes automatic
       encryption settings from the connection. You must encrypt and
       decrypt field values manually using the ``ClientEncryption`` API.

       This option only works with {+csfle-abbrev+}.

   * - ``keyVaultClient``

     - ``MongoClient``

     - No

     - Specifies the ``MongoClient`` that connects to
       the MongoDB instance hosting your {+key-vault-long+}.

       If you omit this option, the driver uses the current ``MongoClient`` instance.

       To learn more about {+key-vault-long+}s, see :ref:`qe-reference-key-vault`.
  
   * - ``tlsOptions``

     - ``Object`` 

     - No 

     - The TLS options to use when connecting to the KMS provider.
