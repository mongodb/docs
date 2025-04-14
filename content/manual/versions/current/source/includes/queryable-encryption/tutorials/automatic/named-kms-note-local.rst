You can also provide a custom name for your KMS provider by passing in a string
that includes the name of the KMS provider, followed by a colon and the custom
name. Providing a unique name for a KMS provider allows you to specify multiple
KMS providers of the same type.

The following example shows an object that sets a the KMS provider name
to "my_kms_provider":

.. code-block:: json
   :emphasize-lines: 2

   {
       "local:my_kms_provider": {
          { "key" : "<local CMK>" }
       },
   }