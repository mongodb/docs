.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description
       
   * - ``awsKms``
     - object
     - Specifies whether Encryption at Rest is enabled for an |service|
       project and the AWS KMS configuration details.

   * - ``awsKms.accessKeyID``
     - string
     - The IAM access key ID with permissions to access the customer
       master key specified by ``customerMasterKeyID``.

   * - ``awsKms.customerMasterKeyID``
     - string
     - The AWS customer master key used to encrypt and decrypt the MongoDB
       master keys.

   * - ``awsKms.enabled``
     - boolean
     - Specifies whether Encryption at Rest is enabled for an |service|
       project.

   * - ``awsKms.region``
     - string
     - The AWS region in which the AWS customer master key exists.
       
   * - ``azureKeyVault``
     - object
     - Specifies Azure Key Vault configuration details and whether
       Encryption at Rest is enabled for an |service| project.

   * - ``azureKeyVault.azureEnvironment``
     - string
     - The Azure environment where the Azure account credentials reside.
       
   * - ``azureKeyVault.clientID``
     - string
     - The client ID, also known as the application ID, for an Azure
       application associated with the :abbr:`Azure AD (Azure Active Directory)`
       tenant.

   * - ``azureKeyVault.enabled``
     - boolean
     - Specifies whether Encryption at Rest is enabled for an |service|
       project and the Azure Key Vault configuration details.

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

   * - ``azureKeyVault.subscriptionID``
     - string
     - The unique identifier associated with an Azure subscription.
       
   * - ``azureKeyVault.tenantID``
     - string
     - Unique identifier for an :abbr:`Azure AD (Azure Active Directory)`
       tenant within an Azure subscription.

   * - ``googleCloudKms.enabled``
     - boolean
     - Specifies whether Encryption at Rest is enabled for an |service|
       project using Google Cloud KMS.

   * - ``googleCloudKms.keyVersionResourceID``
     - string
     - Key Version Resource ID for your Google Cloud KMS.
   