a. Specify the {+key-vault-long-title+} Namespace

   Specify ``encryption.__keyVault`` as the {+key-vault-long+}
   namespace.

   .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/aws/reader/insert_encrypted_document.py
      :start-after: start-key-vault
      :end-before: end-key-vault
      :language: python
      :dedent:

#. Specify your AWS Credentials

   Specify the ``aws`` KMS provider and your {+aws-iam-abbr+} user
   credentials:

   .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/aws/reader/insert_encrypted_document.py
      :start-after: start-kmsproviders
      :end-before: end-kmsproviders
      :language: python
      :dedent:

   .. important:: Reminder: Authenticate with IAM Roles in Production

      To use an {+aws-iam-abbr+} role instead of an {+aws-iam-abbr+} user 
      to authenticate your application,
      specify an empty object for your credentials in your KMS provider
      object. This instructs the driver to automatically retrieve the credentials
      from the environment:

      .. code-block:: python

          kms_provider_credentials = {
            "aws": { }
          }

      You cannot automatically retrieve credentials if you are using a named KMS provider.

#. Create an Encryption Schema For Your Collection

   .. tip:: Add Your {+dek-long+} Base64 ID

      Make sure to update the following code to include your Base64
      {+dek-abbr+} ID. You received this value in the
      :ref:`Generate your {+dek-long+} <csfle-aws-create-dek-python>` step of this
      guide.

   .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/aws/reader/insert_encrypted_document.py
      :start-after: start-schema
      :end-before: end-schema
      :language: python
      :dedent:

#. Specify the Location of the {+shared-library+}

   .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/aws/reader/insert_encrypted_document.py
      :start-after: start-extra-options
      :end-before: end-extra-options
      :language: python
      :dedent:

   .. include:: /includes/tutorials/csfle-shared-lib-learn-more.rst

#. Create the MongoClient

   Instantiate a MongoDB client object with the following automatic
   encryption settings that use the variables declared in the previous steps:

   .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/aws/reader/insert_encrypted_document.py
      :start-after: start-client
      :end-before: end-client
      :language: python
      :dedent:
