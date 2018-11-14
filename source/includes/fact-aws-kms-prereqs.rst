The following prerequisites are required to enable Encryption at Rest
via AWS KMS for a MongoDB project:

* An AWS customer master key (CMK). See `Creating Keys <https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html>`_
  in the AWS documentation for instructions.

* An AWS IAM user in the same AWS account used to create the AWS CMK.
  |service| must have permission to perform the following actions with
  your key:

  - `DescribeKey <https://docs.aws.amazon.com/kms/latest/APIReference/API_DescribeKey.html>`_

  - `Encrypt <https://docs.aws.amazon.com/kms/latest/APIReference/API_Encrypt.html>`_

  - `Decrypt <https://docs.aws.amazon.com/kms/latest/APIReference/API_Decrypt.html>`_ 

  See `IAM Users <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html>`_
  in the AWS documentation for instructions on creating an IAM user.

|service| uses the same IAM user credentials and CMK settings for all 
clusters in a project for which Encryption at Rest is enabled.