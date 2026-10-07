The following table describes the structure of an ``AutoEncryptionOptions`` object:

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

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
       {+shared-library+}. Defaults to ``false`` if not specified.

   * - ``encryptedFieldsMap``

     - ``Object``

     - No

     - A schema that specifies which fields to automatically encrypt and the types 
       of queries allowed on those fields.
      
       To learn how to construct an encryption schema, see
       :ref:`qe-fundamentals-encrypt-query`.       
  
   * - ``extraOptions``

     - ``Object``

     - No 

     - Configuration options for the encryption library.

       To use the {+shared-library+} instead of ``mongocryptd``, specify the 
       full absolute or relative file path to the library file in the
       ``cryptSharedLibPath`` property of this object.
      
       If the driver can't load the {+shared-library+} from this path,
       creating the ``MongoClient`` fails.

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

.. note:: API Documentation

   For more information on these automatic encryption options, see the 
   API documentation for the
   `AutoEncryptionOptions <https://mongodb.github.io/node-mongodb-native/7.7/interfaces/AutoEncryptionOptions.html>`__
   interface.
