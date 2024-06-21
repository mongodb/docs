.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-advanced.rst
      
   .. step:: For the :guilabel:`Encryption at Rest using your Key Management` section, click :guilabel:`Edit` :icon:`edit`.
      
   .. step:: Read the information in the :guilabel:`Grant Access to Keys with an AWS IAM Role` section and click :guilabel:`Configure`.
      
   .. step:: Authorize and assign an AWS IAM role to Atlas to access your AWS KMS keys for encryption at rest.
      
      To create a new |aws| IAM role for accessing your |aws| KMS keys for 
      encryption at rest, follow the :ref:`Create New Role with the 
      AWS CLI <set-up-unified-aws-access>` procedure. If you have an existing 
      |aws| IAM role that you want to authorize, follow the :ref:`Add 
      Trust Relationships to an Existing Role <set-up-unified-aws-access>` 
      procedure.
      
