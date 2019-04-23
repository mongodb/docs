.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``azureKeyVault``
     - object
     - Specifies Azure Key Vault configuration details and whether
       Encryption at Rest is enabled for an |service| project.

   * - ``azureKeyVault.azureEnvironment``
     - string
     - The Azure environment where the Azure account credentials reside.
       Valid values are the following:

       * ``AZURE``
       * ``AZURE_CHINA``
       * ``AZURE_GERMANY``

   * - ``azureKeyVault.clientID``
     - string
     - The client ID, also known as the application ID, for an Azure
       application associated with the :abbr:`Azure AD (Azure Active Directory)`
       tenant.

   * - ``azureKeyVault.enabled``
     - boolean
     - Specifies whether Encryption at Rest is enabled for an |service|
       project.  To disable Encryption at Rest, pass only this parameter
       with a value of ``false``.  When you disable Encryption at Rest,
       |service| also removes the configuration details.

   * - ``azureKeyVault.keyIdentifier``
     - string
     - The unique identifier of a key in an Azure Key Vault.
    
   * - ``azureKeyVault.keyVaultName``
     - string
     - The name of an Azure Key Vault containing your key.
       
   * - ``azureKeyVault.resourceGroupName``
     - string
     - The name of the Azure Resource group that contains an Azure Key
       Vault.
       
   * - ``azureKeyVault.secret``
     - string
     - The secret associated with the Azure Key Vault specified by
       ``azureKeyVault.tenantID``.
       
   * - ``azureKeyVault.subscriptionID``
     - string
     - The unique identifier associated with an Azure subscription.
       
   * - ``azureKeyVault.tenantID``
     - string
     - The unique identifier for an :abbr:`Azure AD (Azure Active Directory)`
       tenant within an Azure subscription.
