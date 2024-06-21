.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-advanced.rst
      
   .. step:: Click :guilabel:`Edit` :icon:`edit`.
      
   .. step:: Update the Azure credentials.
      
      a. Click :guilabel:`Azure Key Vault` if the :guilabel:`Azure Key Vault` 
         selector is not already active.
      
      #. Click :guilabel:`Encryption Key` if the :guilabel:`Encryption Key` 
         selector is not already active.
        
      
      #. Enter the Azure Key Identifier in the :guilabel:`Key Identifier` 
         field.
      
         Include the full |url| to the new encryption key identifier. For 
         example:
      
         .. code-block:: http
      
            https://mykeyvault.vault.azure.net/keys/AtlasKMSKey/a241124e3d364e9eb99fbd3e11124b23
      
         .. important::
      
            The encryption key **must** belong to the Key Vault configured 
            for the project. Click the :guilabel:`Key Vault` section to view 
            the currently configured Key Vault for the project.
      
      #. Click :guilabel:`Update Credentials`.
      
      |service| displays a banner in the {+atlas-ui+} during the 
      Key Identifier rotation process. Do **not**
      delete or disable the original Key Identifier until your
      changes have deployed.
      
      If the cluster uses :ref:`backup-cloud-provider`, do **not** delete
      or disable the original Key Identifier until you
      validate that no snapshots used that key for encryption.     
