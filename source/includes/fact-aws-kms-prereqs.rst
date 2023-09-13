.. include:: /includes/fact-kms-prereqs.rst

- Have a symmetric |aws| |kms| key .
  To learn how to create a key, see
  :aws:`Creating Keys </kms/latest/developerguide/create-keys.html#create-symmetric-cmk>`
  in the |aws| documentation.

  .. note:: 

     To ensure resilience in the event of a regional outage,
     configure your KMS key to be a :aws:`multi-Region key 
     </kms/latest/developerguide/multi-region-keys-overview>`.
    
     To learn more, see :ref:`aws-kms-regional-outage`.

- Have an |aws| |iam| role with sufficient privileges. |service| must
  have permission to perform the following actions with your key:

  - :aws:`DescribeKey </kms/latest/APIReference/API_DescribeKey.html>`

  - :aws:`Encrypt </kms/latest/APIReference/API_Encrypt.html>`

  - :aws:`Decrypt </kms/latest/APIReference/API_Decrypt.html>`

  .. note::

     If you wish to use the |aws| |kms| key with an AWS IAM role from a 
     different AWS account instead of that of the IAM role which 
     created the |aws| |kms| key , ensure you have sufficient privileges:

     - Add a key policy statement under the |aws| |kms| key  to include the 
       external AWS account.

     - Add an IAM inline policy for the IAM role in the external AWS 
       account.

     For a comprehensive discussion of IAM roles and customer master 
     keys, see the `AWS documentation
     <https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-modifying-external-accounts.html>`__.

     After confirming the above privileges, you can follow the usual 
     steps to configure the KMS settings in |service|, with the 
     following exception:
     
     - You must provide the full |arn| for
       the |aws| |kms| key  (e.g. ``arn:aws:kms:eu-west-2:111122223333:key/12345678-1234-1234-1234-12345678``)
       instead of the master key ID (e.g. ``12345678-1234-1234-1234-12345678``)
       in the |aws| |kms| key ID field.

  To learn how to create an |iam| role, see
  :aws:`IAM Roles </IAM/latest/UserGuide/id_roles.html>`
  in the |aws| documentation.

  |service| uses the same |iam| role and |aws| |kms| key settings for
  all clusters in a project for which Encryption at Rest is enabled.

- If your |aws| |kms| configuration requires it, :aws:`allow
  access </kms/latest/developerguide/policy-conditions.html#conditions-aws-ip-address>` 
  from :ref:`Atlas IP addresses <atlas-add-inbound-ips>` and the public IP addresses or DNS hostnames of your cluster nodes so that |service| 
  can communicate with your |kms|. If the node IP addresses 
  :ref:`change <faq-public-ip-changes>`, you must update your 
  configuration to avoid connectivity interruptions.
