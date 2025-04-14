.. TODO: requires code review from driver teams

.. tabs-drivers::

   .. tab::
      :tabid: nodejs
 
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
             creating the ``MongoClient`` will fail.

         * - ``keyVaultClient``

           - ``MongoClient``

           - No

           - Specifies the ``MongoClient`` that should connect to
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
         `AutoEncryptionOptions <https://mongodb.github.io/node-mongodb-native/5.7/interfaces/AutoEncryptionOptions.html>`__
         interface.

   .. tab::
      :tabid: shell

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
             {+shared-library+}.
   
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
             creating the ``MongoClient`` will fail.

         * - ``keyVaultClient``

           - ``MongoClient``

           - No

           - Specifies the ``MongoClient`` that should connect to
             the MongoDB instance hosting your {+key-vault-long+}.

             If you omit this option, the driver uses the current ``MongoClient`` instance.

             To learn more about {+key-vault-long+}s, see :ref:`qe-reference-key-vault`.
        
         * - ``tlsOptions``

           - ``Object`` 

           - No 

           - The TLS options to use when connecting to the KMS provider.

   .. tab::
      :tabid: python

      The following table describes the parameters of the ``AutoEncryptionOpts`` class:

      .. list-table::
         :header-rows: 1
         :widths: 20 10 10 60

         * - Parameter

           - Data Type

           - Required?

           - Description

         * - ``key_vault_namespace``

           - ``String``

           - Yes

           - The full :term:`namespace` of the {+key-vault-long+}.

         * - ``kms_providers``

           - ``Mapping[string, Any]``

           - Yes

           - The {+kms-long+} (KMS) used by {+qe+} for
             managing your {+cmk-long+}s (CMKs).

             To learn more about ``kms_Providers`` maps, see
             :ref:`qe-fundamentals-kms-providers`.

             To learn more about {+cmk-long+}s, see :ref:`qe-reference-keys-key-vaults`.
        
         * - ``bypass_auto_encryption``

           - ``Boolean``

           - No

           - Specify ``True`` to bypass automatic encryption rules and perform explicit
             (manual) per-field encryption.

         * - ``bypass_query_analysis``

           - ``Boolean``

           - No

           - Disables automatic analysis of outgoing commands. Specify
             ``True`` to use explicit encryption without the
             {+shared-library+}.
   
         * - ``encrypted_fields_map``

           - ``Mapping``

           - No

           - A schema that specifies which fields to automatically encrypt and the types 
             of queries allowed on those fields.
            
             To learn how to construct an encryption schema, see
             :ref:`qe-fundamentals-encrypt-query`.       
        
         * - ``crypt_shared_lib_path``

           - ``String``

           - No 

           - Specify the full absolute or relative file path to the library file in the
             this parameter to use the {+shared-library+} instead of ``mongocryptd``, 
            
             If the driver can't load the {+shared-library+} from this path,
             it raises an error.
        
         * - ``crypt_shared_lib_required``

           - ``Boolean``

           - No 

           - If you specify ``True``, the driver raises an error if ``libmongocrypt``
             can't load the {+shared-library+}.

         * - ``key_vault_client``

           - ``MongoClient``

           - No

           - Specifies the ``MongoClient`` that should connect to
             the MongoDB instance hosting your {+key-vault-long+}.

             If you omit this option, the driver uses the current ``MongoClient`` instance.

             To learn more about {+key-vault-long+}s, see :ref:`qe-reference-key-vault`.
        
         * - ``kms_tls_options``

           - ``Mapping[string, Any]``

           - No 

           - The TLS options to use when connecting to the KMS provider.

         * - ``mongocryptd_uri``

           - ``String``

           - No 

           - The MongoDB URI used to connect to the local ``mongocryptd`` process, if 
             using ``mongocryptd`` for encryption.
        
         * - ``mongocryptd_bypass_spawn``

           - ``Boolean``

           - No 

           - If you specify ``True`` for this parameter, the encrypted ``MongoClient``
             does not attempt to spawn the ``mongocryptd`` process, if using ``mongocryptd``
             for encryption.

         * - ``mongocryptd_spawn_path``

           - ``String``

           - No 

           - Used for spawning the ``mongocryptd`` process, if using ``mongocryptd``
             for encryption.

         * - ``mongocryptd_spawn_args``

           - ``String``

           - No 

           - A list of string arguments to use when spawning the ``mongocryptd`` process,
             if using ``mongocryptd`` for encryption.

      .. note:: API Documentation

         For more information on these automatic encryption options, see the 
         API documentation for the
         `AutoEncryptionOpts <https://pymongo.readthedocs.io/en/stable/api/pymongo/encryption_options.html#pymongo.encryption_options.AutoEncryptionOpts>`__
         class.

   .. tab::
      :tabid: go

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
             creating the ``MongoClient`` will fail.

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
         `AutoEncryptionOptions <https://pkg.go.dev/go.mongodb.org/mongo-driver@v1.12.1/mongo/options#AutoEncryptionOptions>`__
         type.

   .. tab::
      :tabid: csharp

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
             creating the ``MongoClient`` will fail.

         * - ``KeyVaultClient``

           - ``IMongoClient``

           - No

           - Specifies the ``MongoClient`` that should connect to
             the MongoDB instance hosting your {+key-vault-long+}.

             If you omit this option, the driver uses the current ``MongoClient`` instance.

             To learn more about {+key-vault-long+}s, see :ref:`qe-reference-key-vault`.
        
         * - ``TlsOptions``

           - ``IReadOnlyDictionary``

           - No 

           - The TLS options to use when connecting to the KMS provider.

      .. note:: API Documentation

         For more information on these automatic encryption options, see the 
         API documentation for the `AutoEncryptionOptions <https://mongodb.github.io/mongo-csharp-driver/2.20/apidocs/html/T_MongoDB_Driver_Encryption_AutoEncryptionOptions.htm>`__
         class.

   .. tab::
      :tabid: java-sync

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
         API documentation for the `AutoEncryptionSettings.Builder <https://mongodb.github.io/mongo-java-driver/4.10/apidocs/mongodb-driver-core/com/mongodb/AutoEncryptionSettings.Builder.html>`__
         class.
