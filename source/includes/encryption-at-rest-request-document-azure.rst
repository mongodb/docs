.. list-table::
   :widths: 15 10 10 65
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - ``azureKeyVault``
     - object
     - Required
     - |akv| configuration details and whether {+encrypt-at-rest+} is
       enabled for an |service| project.

   * - | ``azureKeyVault``
       | ``.azureEnvironment``
     - string
     - Optional
     - Azure environment where the Azure account credentials reside.
       Valid values are the following:

       * ``AZURE``
       * ``AZURE_CHINA``
       * ``AZURE_GERMANY``

   * - | ``azureKeyVault``
       | ``.clientID``
     - string
     - Optional
     - Client ID, also known as the application ID, for an Azure
       application associated with the |azure-ad| tenant.

   * - | ``azureKeyVault``
       | ``.enabled``
     - boolean
     - Required
     - Flag that indicates whether {+encrypt-at-rest+} is enabled for
       |a-service| project. To disable {+encrypt-at-rest+}, pass only
       this parameter with a value of ``false``. When you disable
       {+encrypt-at-rest+}, |service| also removes the configuration
       details.

   * - | ``azureKeyVault``
       | ``.keyIdentifier``
     - string
     - Optional
     - Unique identifier of a key in an |akv|.

   * - | ``azureKeyVault``
       | ``.keyVaultName``
     - string
     - Optional
     - Name of an |akv| containing your key.

   * - | ``azureKeyVault``
       | ``.resourceGroupName``
     - string
     - Optional
     - Name of the Azure Resource group that contains an |akv|.

   * - | ``azureKeyVault``
       | ``.secret``
     - string
     - Optional
     - Secret associated with the |akv| (``azureKeyVault.tenantID``).

   * - | ``azureKeyVault``
       | ``.subscriptionID``
     - string
     - Optional
     - Unique identifier associated with an Azure subscription.

   * - | ``azureKeyVault``
       | ``.tenantID``
     - string
     - Optional
     - Unique identifier for an |azure-ad| tenant within an Azure
       subscription.
