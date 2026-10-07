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

       To learn more about ``kms_providers`` maps, see
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

     - Specify the full absolute or relative file path to the library file
       to use the {+shared-library+} instead of ``mongocryptd``.
      
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

     - Specifies the ``MongoClient`` that connects to
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
