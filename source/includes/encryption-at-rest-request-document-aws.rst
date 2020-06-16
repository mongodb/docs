.. list-table::
   :widths: 15 10 10 65
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - ``awsKms``
     - object
     - Required
     - |aws| |kms| configuration details and whether {+encrypt-at-rest+}
       is enabled for |a-service| project.

   * - | ``awsKms``
       | ``.accessKeyID``
     - string
     - Optional
     - |iam| access key ID with permissions to access the customer
       master key (``awsKms.customerMasterKeyID``).

   * - | ``awsKms``
       | ``.customerMasterKeyID``
     - string
     - Optional
     - |aws| customer master key used to encrypt and decrypt the MongoDB
       master keys.

   * - | ``awsKms``
       | ``.enabled``
     - boolean
     - Optional
     - Flag that indicates whether {+encrypt-at-rest+} is enabled for
       |a-service| project. To disable {+encrypt-at-rest+}, pass only
       this parameter with a value of ``false``. When you disable
       {+encrypt-at-rest+}, |service| removes the configuration
       details.

   * - | ``awsKms``
       | ``.region``
     - string
     - Optional
     - |aws| region in which the |aws| customer master key exists:

       .. include:: /includes/fact-aws-region-names.rst

   * - | ``awsKms``
       | ``.secretAccessKey``
     - string
     - Optional
     - |iam| secret access key with permissions to access the customer
       master key (``awsKms.customerMasterKeyID``).
