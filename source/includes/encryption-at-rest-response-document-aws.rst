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
