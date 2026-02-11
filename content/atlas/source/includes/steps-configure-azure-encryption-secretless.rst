.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-advanced.rst
      
   .. step:: Toggle the button next to :guilabel:`Encryption at Rest using your Key Management` to :guilabel:`On`.
      
   .. step:: Select :guilabel:`Azure Key Vault`.

   .. step:: Configure your authentication method.

      |service| supports two authentication methods for |akv|:

      - **Service Principal (Recommended)**: Use an |service|-managed
        service principal specific to your project to authenticate to
        |akv| (secretless authentication covered here).
      - **Static Credentials**: Provide customer-managed credentials. 
        To learn more, see :ref:`security-azure-kms-public-network` or 
        :ref:`security-azure-kms-pvt-endpoint`.
      
   .. step:: Enter the :guilabel:`Key Vault Configuration`.
      
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

         You can't modify the |akv| configuration here after you
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
