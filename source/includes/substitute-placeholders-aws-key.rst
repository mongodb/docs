.. note:: Placeholder Text

   You must substitute all text in quotes and angle brackets with
   your KMS configuration values.

   For example, the Node.js code prompts you to include a master key value
   as follows:

   .. code-block:: javascript
      :copyable: false

      masterKey: {
        key: "<Master Key ARN>"
        ...
      }


   If your master key is "arn:aws:kms:us-east-2:111122223333:alias/test-key",
   substitute the text as follows:

   .. code-block:: javascript
      :copyable: false

      masterKey: {
        key: "arn:aws:kms:us-east-2:111122223333:alias/test-key"
        ...
      }
