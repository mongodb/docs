.. _aws-create-master-key:

.. procedure::
   :style: connected
   
   .. step:: Create your Azure Key Vault and {+cmk-long+}

      To create a new {+azure-kv+} instance and {+cmk-long+},
      follow Microsoft's official
      `Set and retrieve a key from Azure Key Vault using the Azure portal <https://docs.microsoft.com/en-us/azure/key-vault/keys/quick-create-portal>`__
      Quick Start.

      .. important:: Record your Credentials
      
         Ensure you record the following credentials:

         - **Key Name**
         - **Key Identifier** (referred to as ``keyVaultEndpoint`` later in this guide)
         - **Key Version**

         You will need them to construct your ``dataKeyOpts`` object
         later in this tutorial.

   .. step:: Grant Permissions

      Grant your client application ``wrap`` and ``unwrap`` permissions
      to the key.
