.. _aws-create-master-key:

.. procedure::
   :style: connected

   .. step:: Log in to your `AWS Management Console <https://aws.amazon.com/console/>`__.
 
   .. step:: Navigate to the `AWS KMS Console <https://aws.amazon.com/kms/>`__.
   
   .. step:: Create your {+cmk-long+}

      Create a new symmetric key by following the official AWS
      documentation on
      `Creating symmetric KMS keys <https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html#create-symmetric-cmk>`__.      
      The key you create is your {+cmk-long+}.
      Choose a name and description that helps you identify it;
      these fields do not affect the functionality or configuration of your {+cmk-abbr+}.

      In the :guilabel:`Usage Permissions` step of the key generation
      process, apply the following default key policy that enables
      Identity and Access Management ({+aws-iam-abbr+}) policies to
      grant access to your {+cmk-long+}:

      .. literalinclude:: /includes/tutorials/automatic/aws/key-policy-default.json
         :language: json

      .. important:: 

         Record the Amazon Resource Name ({+aws-arn-abbr+}) and Region of
         your {+cmk-long+}. You will use these in later steps of this guide.

      .. tip:: Learn More

         To learn more about your {+cmk-long+}s, see
         :ref:`csfle-reference-keys-key-vaults`.

         To learn more about key policies, see
         `Key Policies in AWS KMS <https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html>`__
         in the official AWS documentation.
