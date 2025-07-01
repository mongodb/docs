.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-advanced.rst
      
   .. step:: Toggle the button next to :guilabel:`Encryption at Rest using your Key Management` to :guilabel:`On`.
      
   .. step:: Click the :guilabel:`Authorize a new IAM role` link to authorize an |aws| IAM role to |service| to access your |aws| KMS keys for encryption at rest.

      To create a new |aws| IAM role for accessing your |aws| KMS keys for 
      encryption at rest, follow the :ref:`Create New Role with the 
      AWS CLI <set-up-unified-aws-access>` procedure. If you have an existing 
      |aws| IAM role that you want to authorize, follow the :ref:`Add 
      Trust Relationships to an Existing Role <set-up-unified-aws-access>` 
      procedure.
      
   .. step:: Add an access policy to your |aws| IAM role via the |aws| console or CLI. See `Managing IAM policies <https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage.html>`__ for more information.

      .. include:: /includes/fact-enable-rba.rst

      The access policy for encryption at rest looks similar to the following: 
      
      .. code-block:: json 
      
         {
           "Version": "2012-10-17",
           "Statement": [
             {
               "Effect": "Allow",
               "Action": [
                 "kms:Decrypt",
                 "kms:Encrypt",
                 "kms:DescribeKey"
               ],
               "Resource": [
                 "arn:aws:kms:us-east-1:123456789012:key/12x345y6-7z89-0a12-3456-xyz123456789"
               ]
             }
           ]
         }
      
   .. step:: Repeat steps 1 and 2 to assign the role you authorized in step 3 to your project for accessing your encryption key.
      
   .. step:: Specify the following for accessing your encryption key and click :guilabel:`Save`.
      
      a. Select the role to assign from the :guilabel:`AWS IAM role` dropdown 
         list.
      
      #. Specify your encryption key in the :guilabel:`Customer Master Key ID` 
         field.
      
      #. Select the |aws| region for your encryption key.   
