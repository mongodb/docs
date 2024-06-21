.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-advanced.rst
      
   .. step:: Toggle the button next to :guilabel:`Encryption at Rest using your Key Management` to :guilabel:`On`.
      
   .. step:: Select :guilabel:`Azure Key Vault`.
      
   .. step:: Enter your :guilabel:`Account Credentials`.
      
      .. list-table::
         :widths: 20 80
         :stub-columns: 1
      
         * - Client ID
           - Enter the :guilabel:`Client ID` (or
             :guilabel:`Application ID`) of the Azure application.
      
         * - Tenant ID
           - Enter the :guilabel:`Tenant ID` (or :guilabel:`Directory ID`)
             of the Active Directory tenant.
      
         * - Secret
           - Enter one of the application's non-expired
             :guilabel:`Passwords`.
      
         * - Azure Environment
           - Select the Azure cloud your Active Directory tenant lives in.
      
   .. step:: Enter the :guilabel:`Key Vault Credentials`.
      
      .. list-table::
         :widths: 20 80
         :stub-columns: 1
      
         * - Subscription ID
           - Enter the :guilabel:`Subscription ID` of the Key Vault.
      
         * - Resource Group Name
           - Enter the :guilabel:`Resource Group` of the Key Vault.
      
         * - Key Vault Name
           - Enter the name of the Key Vault.
      
   .. step:: Enter the :guilabel:`Encryption Key`.
      
      .. list-table::
         :widths: 20 80
         :stub-columns: 1
      
         * - Key Identifier
           - Enter the full |url| for the key created in the Key Vault.
      
             .. important::
      
                The key identifier must be provided in the full
                :azure:`Azure general format </key-vault/general/about-keys-secrets-certificates>`
      
                .. code-block:: text
      
                   https://{keyvault-name}.vault.azure.net/{object-type}/{object-name}/{object-version}
      
   .. step:: Click :guilabel:`Save`.
      
      |service| displays a banner in the |service| console during the
      encryption process. 
