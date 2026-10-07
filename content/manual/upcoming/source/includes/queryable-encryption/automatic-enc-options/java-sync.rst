The following table describes the methods available on the ``AutoEncryptionSettings``
builder:

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Method

     - Data Type

     - Required?

     - Description

   * - ``keyVaultNamespace``

     - ``String``

     - Yes

     - The full :term:`namespace` of the {+key-vault-long+}.

   * - ``kmsProviders``

     - ``Map``

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

     - Disables automatic analysis of outgoing commands. Specify 
       ``true`` to use explicit encryption without the
       {+shared-library+}.

   * - ``encryptedFieldsMap``

     - ``Map``

     - No

     - A schema that specifies which fields to automatically encrypt and the types 
       of queries allowed on those fields.
      
       To learn how to construct an encryption schema, see
       :ref:`qe-fundamentals-encrypt-query`.       
  
   * - ``extraOptions``

     - ``Map``

     - No 

     - Configuration options for the encryption library.

       To use the {+shared-library+} instead of ``mongocryptd``, specify the 
       full absolute or relative file path to the library file in the
       ``cryptSharedLibPath`` property.
      
   * - ``keyVaultMongoClientSettings``

     - ``MongoClientSettings``

     - No

     - Settings for a new ``MongoClient`` instance to
       connect to the MongoDB instance hosting your {+key-vault-long+}.

       If you omit this option, the driver uses the current ``MongoClient`` instance.
      
       To learn more about {+key-vault-long+}s, see :ref:`qe-reference-key-vault`.

   * - ``kmsProviderPropertySuppliers``

     - ``Map``

     - No

     - Similar to the ``kmsProviders()`` method, but configures a ``Supplier`` for 
       each property instead.

   * - ``kmsProviderSslContextMap``

     - ``Map`` 

     - No

     - The SSL context to use for authentication. 

.. note:: API Documentation

   For more information on these automatic encryption options, see the 
   API documentation for the `AutoEncryptionSettings.Builder <https://mongodb.github.io/mongo-java-driver/5.4/apidocs/mongodb-driver-core/com/mongodb/AutoEncryptionSettings.Builder.html>`__
   class.
