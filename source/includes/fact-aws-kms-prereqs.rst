To enable customer-managed keys with |aws| |kms| for a MongoDB
project, you must:

- Have an |aws| customer master key (|cmk|).
  To learn how to create a key, see
  :aws:`Creating Keys </kms/latest/developerguide/create-keys.html>`
  in the |aws| documentation.

- Have an |aws| |iam| user with sufficient privileges. |service| must
  have permission to perform the following actions with your key:

  - :aws:`DescribeKey </kms/latest/APIReference/API_DescribeKey.html>`

  - :aws:`Encrypt </kms/latest/APIReference/API_Encrypt.html>`

  - :aws:`Decrypt </kms/latest/APIReference/API_Decrypt.html>`

  .. note::

     If you wish to use the AWS CMK with an AWS IAM user from a different
     AWS account instead of the IAM user who created the AWS CMK, ensure you have
     sufficient privileges:

     - Add a key policy statement under the AWS CMK to include the external
       AWS account.

     - Add an IAM inline policy for the IAM user in the external AWS account.

     For a comprehensive discussion of IAM roles and customer master keys, see
     the `AWS documentation
     <https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-modifying-external-accounts.html>`__.

     After confirming the above privileges, you can follow the usual steps to
     configure the KMS settings in |service|, with the following exception:
     
     - You must provide the full |arn| for
       the |cmk| (e.g. ``arn:aws:kms:eu-west-2:111122223333:key/12345678-1234-1234-1234-12345678``)
       instead of the master key ID (e.g. ``12345678-1234-1234-1234-12345678``)
       in the |cmk| ID field.

  To learn how to create an |iam| user, see
  :aws:`IAM Users </IAM/latest/UserGuide/id_users.html>`
  in the |aws| documentation.

  |service| uses the same |iam| user credentials and |cmk| settings for
  all clusters in a project for which Encryption at Rest is enabled.
