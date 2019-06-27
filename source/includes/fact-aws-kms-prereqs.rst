To enable customer-managed keys with |aws| |kms| for a MongoDB
project, you must:

- Have an |aws| customer master key (|cmk|).
  To learn how to create a key, see
  :aws:`Creating Keys </kms/latest/developerguide/create-keys.html>`
  in the |aws| documentation.

- Have an |aws| |iam| user in the same |aws| account used to create the
  |aws| |cmk|. |service| must have permission to perform the following
  actions with your key:

  - :aws:`DescribeKey </kms/latest/APIReference/API_DescribeKey.html>`

  - :aws:`Encrypt </kms/latest/APIReference/API_Encrypt.html>`

  - :aws:`Decrypt </kms/latest/APIReference/API_Decrypt.html>`

  To learn how to create an |iam| user, see
  :aws:`IAM Users </IAM/latest/UserGuide/id_users.html>`
  in the |aws| documentation.

  |service| uses the same |iam| user credentials and |cmk| settings for
  all clusters in a project for which Encryption at Rest is enabled.
