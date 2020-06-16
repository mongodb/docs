.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``awsKms``
     - object
     - Specifies whether {+encrypt-at-rest+} is enabled for |a-service|
       project and the |aws| |kms| configuration details.

   * - | ``awsKms``
       | ``.accessKeyID``
     - string
     - |iam| access key ID with permissions to access the customer
       master key (``awsKms.customerMasterKeyID``).

   * - | ``awsKms``
       | ``.customerMasterKeyID``
     - string
     - |aws| customer master key used to encrypt and decrypt the
       MongoDB master keys.

   * - | ``awsKms``
       | ``.enabled``
     - boolean
     - Flag that indicates whether {+encrypt-at-rest+} is enabled for
       |a-service| project.

   * - | ``awsKms``
       | ``.region``
     - string
     - |aws| region in which the |aws| customer master key exists.

   * - | ``awsKms``
       | ``.valid``
     - boolean
     - .. include:: /includes/api-valid-field.rst
