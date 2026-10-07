The following table describes the properties in an ``AutoEncryptionOptions`` object:

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Property

     - Data Type

     - Required?

     - Description

   * - ``KeyVaultNamespace``

     - ``CollectionNamespace``

     - Yes

     - The full :term:`namespace` of the {+key-vault-long+}.

   * - ``KmsProviders``

     - ``IReadOnlyDictionary``

     - Yes

     - The {+kms-long+} (KMS) used by {+qe+} for
       managing your {+cmk-long+}s (CMKs).

       To learn more about ``KmsProviders`` objects, see
       :ref:`qe-fundamentals-kms-providers`.

       To learn more about {+cmk-long+}s, see :ref:`qe-reference-keys-key-vaults`.
  
   * - ``BypassAutoEncryption``

     - ``Boolean``

     - No

     - Specify ``true`` to bypass automatic encryption rules and perform explicit
       (manual) per-field encryption.

   * - ``BypassQueryAnalysis``

     - ``Boolean``

     - No

     - Disables automatic analysis of outgoing commands. Set this property to
       ``true`` to use explicit encryption without the
       {+shared-library+}.

   * - ``EncryptedFieldsMap``

     - ``IReadOnlyDictionary``

     - No

     - A schema that specifies which fields to automatically encrypt and the types 
       of queries allowed on those fields.
      
       To learn how to construct an encryption schema, see
       :ref:`qe-fundamentals-encrypt-query`.       
  
   * - ``ExtraOptions``

     - ``IReadOnlyDictionary``

     - No 

     - Configuration options for the encryption library.

       To use the {+shared-library+} instead of ``mongocryptd``, specify the 
       full absolute or relative file path to the library file in the
       ``cryptSharedLibPath`` property.
      
       If the driver can't load the {+shared-library+} from this path,
       creating the ``MongoClient`` fails.

   * - ``KeyVaultClient``

     - ``IMongoClient``

     - No

     - Specifies the ``MongoClient`` that connects to
       the MongoDB instance hosting your {+key-vault-long+}.

       If you omit this option, the driver uses the current ``MongoClient`` instance.

       To learn more about {+key-vault-long+}s, see :ref:`qe-reference-key-vault`.
  
   * - ``TlsOptions``

     - ``IReadOnlyDictionary``

     - No 

     - The TLS options to use when connecting to the KMS provider.

.. note:: API Documentation

   For more information on these automatic encryption options, see the 
   API documentation for the `AutoEncryptionOptions <https://mongodb.github.io/mongo-csharp-driver/3.12.0/api/MongoDB.Driver/MongoDB.Driver.AutoEncryptionOptions.html>`__
   class.
