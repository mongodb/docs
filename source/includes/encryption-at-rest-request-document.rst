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

   * - ``awsKms.enabled``
     - boolean
     - Specifies whether Encryption at Rest is enabled for an |service|
       project.  To disable Encryption at Rest, pass this parameter only
       with a value of ``false``.  When you disable Encryption at Rest,
       |service| also removes the AWS KMS configuration details.

   * - ``awsKms.accessKeyID``
     - string
     - The IAM access key ID with permissions to access the customer
       master key specified by ``customerMasterKeyID``.

   * - ``awsKms.secretAccessKey``
     - string
     - The IAM secret access key with permissions to access the customer
       master key specified by ``customerMasterKeyID``.

   * - ``awsKms.customerMasterKeyID``
     - string
     - The AWS customer master key used to encrypt and decrypt the MongoDB
       master keys.

   * - ``awsKms.region``
     - string
     - The AWS region in which the AWS customer master key exists:
       
       .. include:: /includes/fact-aws-region-names.rst