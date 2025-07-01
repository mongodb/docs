.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-advanced.rst
      
   .. step:: For the :guilabel:`Encryption at Rest using your Key Management` section, click :guilabel:`Edit` :icon:`edit`.
      
   .. step:: Update the |aws| |cmk| details.
      
      a. Enter the following information:
      
         .. list-table::
            :widths: 35 65
            :header-rows: 1
      
            * - Field
              - Action
      
            * - :guilabel:`AWS IAM role`
              - Select an existing |aws| IAM role that already has access 
                to your |kms| keys, or authorize a new role and grant this 
                role access to your |kms| keys with the following 
                permissions:
      
                - :aws:`DescribeKey </kms/latest/APIReference/API_DescribeKey.html>`
      
                - :aws:`Encrypt </kms/latest/APIReference/API_Encrypt.html>`
      
                - :aws:`Decrypt </kms/latest/APIReference/API_Decrypt.html>`
      
                To learn more, see 
                :ref:`Role-Based Access to Your Encryption Key for a Project <aws-kms-enable-project>`.
      
            * - :guilabel:`Customer Master Key ID`
              - Enter your AWS customer master key ID.
      
            * - :guilabel:`Customer Master Key Region`
              - Select the |aws| region in which you created your |aws| |cmk|.
      
                |service| lists only |aws| regions that support |aws| |kms|.
      
      #. Click :guilabel:`Save`.
      
      |service| displays a banner in the |service| console during the 
      |cmk| rotation process. Do **not** delete or disable the |cmk| until 
      your changes have deployed.     
