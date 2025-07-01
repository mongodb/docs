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
             :guilabel:`Application ID`) of the Azure application. Ensure 
             that you have assigned the :guilabel:`Active Directory Application` 
             the necessary access. To learn more, see :ref:`azure-ear-required-access`.
      
         * - Tenant ID
           - Enter the :guilabel:`Tenant ID` (or :guilabel:`Directory ID`)
             of the Active Directory tenant. 
      
         * - Secret
           - Enter one of the application's non-expired Client Secrets 
             associated with the Active Directory tenant. 
      
         * - Azure Environment
           - Select the Azure cloud your Active Directory tenant lives in.
      
   .. step:: Enter the :guilabel:`Key Vault Credentials`.
      
      .. list-table::
         :widths: 20 80
         :stub-columns: 1
      
         * - Subscription ID
           - Enter the :guilabel:`Subscription ID` of the Key Vault.
      
         * - Resource Group Name
           - Enter the :guilabel:`Resource Group` name of an 
             :guilabel:`Azure Resource Group` containing the Key Vault.
      
         * - Key Vault Name
           - Enter the name of the Key Vault. Ensure that the Key Vault has 
             the necessary Access Policies. To learn more, see 
             :ref:`azure-ear-required-access`. 

      .. note:: 

         You can't modify the |akv| credentials here after you
         :ref:`enable and set up private endpoint connections 
         <azure-kms-enable-pvt-endpoint>` to your |akv|. 

   .. step:: Enter the :guilabel:`Encryption Key`.
      
      .. list-table::
         :widths: 20 80
         :stub-columns: 1
      
         * - Key Identifier
           - Enter the full |url| for the key created in the Key Vault.
      
             :gold:`IMPORTANT:` The key identifier must be provided in the full
             :azure:`Azure general format </key-vault/general/about-keys-secrets-certificates>`:
      
             .. code-block:: text
      
                https://{keyvault-name}.vault.azure.net/{object-type}/{object-name}/{object-version}

   .. step:: (Optional) Configure private endpoint connections to your |akv|.

      To learn more, see :ref:`azure-kms-enable-pvt-endpoint`

   .. step:: Verify the network settings. 

      If you configured |service| using the {+atlas-admin-api+} to
      communicate with |akv| using {+az-pl+} to ensure that all traffic
      between |service| and Key Vault takes place over |azure|'s 
      private network interfaces, |service| sets the :guilabel:`Require
      Private Networking` status to :guilabel:`Active`. If the status is
      :guilabel:`Inactive`, you can, optionally, complete the steps to
      :ref:`azure-kms-enable-pvt-endpoint` if you want |service| to use
      private endpoint connections for your |akv|.  

   .. step:: Click :guilabel:`Save`.
      
      |service| displays a banner in the |service| console during the
      encryption process. 
