The following table describes the options in an ``AutoEncryptionOptions`` object:

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Option

     - Data Type

     - Required?

     - Description

   * - ``KeyVaultNamespace``

     - ``String``

     - Yes

     - The full :term:`namespace` of the {+key-vault-long+}.

   * - ``KmsProviders``

     - ``map[string]map[string]interface{}``

     - Yes

     - The {+kms-long+} (KMS) used by {+qe+} for
       managing your {+cmk-long+}s (CMKs).

       To learn more about ``KmsProviders`` objects, see
       :ref:`qe-fundamentals-kms-providers`.

       To learn more about {+cmk-long+}s, see :ref:`qe-reference-keys-key-vaults`.
  
   * - ``BypassAutoEncryption``

     - ``*bool``

     - No

     - Specify ``true`` to bypass automatic encryption rules and perform explicit
       (manual) per-field encryption.

   * - ``BypassQueryAnalysis``

     - ``*bool``

     - No

     - Disables automatic analysis of outgoing commands. Specify 
       ``true`` to use explicit encryption without the
       {+shared-library+}.

   * - ``EncryptedFieldsMap``

     - ``map[string]interface{}``

     - No

     - A schema that specifies which fields to automatically encrypt and the types 
       of queries allowed on those fields.
      
       To learn how to construct an encryption schema, see
       :ref:`qe-fundamentals-encrypt-query`.       
  
   * - ``ExtraOptions``

     - ``map[string]interface{}``

     - No 

     - Configuration options for the encryption library.

       To use the {+shared-library+} instead of ``mongocryptd``, specify the 
       full absolute or relative file path to the library file in the
       ``cryptSharedLibPath`` property.
      
       If the driver can't load the {+shared-library+} from this path,
       creating the ``MongoClient`` fails.

   * - ``KeyVaultClientOptions``

     - ``*ClientOptions``

     - No

     - Options for a new internal ``mongo.Client`` to connect to
       the MongoDB instance hosting your {+key-vault-long+}.

       If you omit this option, the driver uses the current ``MongoClient`` instance.
      
       To learn more about {+key-vault-long+}s, see :ref:`qe-reference-key-vault`.

   * - ``TlsConfig``

     - ``map[string]*tls.Config``

     - No 

     - The TLS options to use when connecting to the KMS provider.

.. note:: API Documentation

   For more information on these automatic encryption options, see the 
   API documentation for the
   `AutoEncryptionOptions <https://pkg.go.dev/go.mongodb.org/mongo-driver/v2/mongo/options#AutoEncryptionOptions>`__
   type.
