a. Add your AWS KMS Credentials

   Add the service account credentials to your CSFLE-enabled client
   code.

   .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/aws/reader/make_data_key.js
      :start-after: start-kmsproviders
      :end-before: end-kmsproviders
      :language: javascript
      :dedent:

#. Add Your Key Information

   Update the following code to specify your {+cmk-long+}:

   .. tip::

      You recorded your {+cmk-long+}'s {+aws-arn-abbr+} and Region
      in the Create a {+cmk-long+} step of this guide.

   .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/aws/reader/make_data_key.js
      :end-before: end-datakeyopts
      :language: javascript
      :dedent:

#. Generate your {+dek-long+}

   .. _csfle-aws-create-dek-nodejs:

   .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/aws/reader/make_data_key.js
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: javascript
            :dedent:

   .. include:: /includes/tutorials/automatic/node-include-clientEncryption.rst

.. tip:: Learn More

   To view a diagram showing how your client application creates your
   {+dek-long+} when using an AWS KMS, see
   :ref:`csfle-reference-kms-providers-aws-architecture`.

   To learn more about the options for creating a {+dek-long+}
   encrypted with a {+cmk-long+} hosted in AWS KMS, see
   :ref:`csfle-kms-datakeyopts-aws`.
