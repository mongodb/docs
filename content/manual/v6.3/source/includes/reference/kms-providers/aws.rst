.. _csfle-reference-kms-providers-aws-architecture:

Architecture
````````````

The following diagram describes the architecture of a
{+csfle-abbrev+}-enabled application using {+aws-abbr+} KMS.

.. image:: /images/CSFLE_Data_Key_KMS.png
   :alt: Diagram KMS

.. include:: /includes/reference/kms-providers/cmk-note.rst

.. _csfle-kms-provider-object-aws:

kmsProviders Object
```````````````````

The following table presents the structure of a ``kmsProviders``
object for AWS KMS:

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 25 15 15 45

   * - Field
     - Required for IAM User
     - Required for IAM Role
     - Description

   * - Access Key ID
     - Yes
     - Yes
     - Identifies the account user.

   * - Secret Access Key
     - Yes
     - Yes
     - Contains the authentication credentials of the account user.

   * - Session Token
     - No
     - Yes
     - Contains a token obtained from AWS Security Token Service (STS).

.. _csfle-kms-datakeyopts-aws:

dataKeyOpts Object
``````````````````

The following table presents the structure of a ``dataKeyOpts``
object for AWS KMS:

.. list-table::
  :header-rows: 1
  :stub-columns: 1
  :widths: 30 15 45

  * - Field
    - Required
    - Description

  * - key
    - Yes
    - `Amazon Resource Number (ARN) <https://docs.aws.amazon.com/kms/latest/developerguide/viewing-keys.html#find-cmk-id-arn>`__
      of the master key.

  * - region
    - No
    - AWS region of your master key, e.g. "us-west-2"; required only if not specified in your ARN.

  * - endpoint
    - No
    - Custom hostname for the AWS endpoint if configured for your account.
