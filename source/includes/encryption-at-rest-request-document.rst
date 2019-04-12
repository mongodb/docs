.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``awsKms``
     - object
     - Specifies AWS KMS configuration details and whether Encryption at
       Rest is enabled for an |service| project.

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
       project.  To disable Encryption at Rest, pass only this parameter
       with a value of ``false``.  When you disable Encryption at Rest,
       |service| also removes the configuration details.

   * - ``awsKms.region``
     - string
     - The AWS region in which the AWS customer master key exists:
       
       .. include:: /includes/fact-aws-region-names.rst

   * - ``awsKms.secretAccessKey``
     - string
     - The IAM secret access key with permissions to access the customer
       master key specified by ``customerMasterKeyID``.

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
      
   * - ``googleCloudKms``
     - object
     - Specifies |gcp| KMS configuration details and whether
       Encryption at Rest is enabled for an |service| project.

   * - ``googleCloudKms.enabled``
     - boolean
     - Specifies whether Encryption at Rest is enabled for an |service|
       project.  To disable Encryption at Rest, pass only this parameter
       with a value of ``false``.  When you disable Encryption at Rest,
       |service| also removes the configuration details.

   * - ``googleCloudKms.serviceAccountKey``
     - string
     - String-formatted JSON object containing |gcp| KMS credentials
       from your GCP account.

       .. note::

          Your Service Account Key is a JSON object, but it must be
          formatted as a string for API call purposes.

       For more information, see the `GCP
       documentation
       <https://cloud.google.com/docs/authentication/getting-started>`__.

   * - ``googleCloudKms.keyVersionResourceID``
     - string
     - The Key Version Resource ID from your GCP account.
