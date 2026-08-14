.. list-table::
   :header-rows: 1
   :widths: 25 60 15

   * - Request Body Field
     - Value
     - Necessity

   * - ``cloudProvider``
     - ``AWS``
     - Required

   * - ``bucketName``
     - Name of the |aws| |s3| bucket that is authorized to receive
       |service| {+Cloud-Backup+} snapshots. To set up |service|
       access to this bucket, see the :ref:`Prerequisites
       <cloud-backup-export-prereqs-aws>` section.
     - Required

   * - ``iamRoleId``
     - Unique 24-hexadecimal character string that identifies the
       unified AWS access role ID that |service| must use to
       access the |aws| |s3| Bucket.

       This is the ID of the cloud provider access role that you
       created for your AWS IAM role in the :ref:`Prerequisites
       <cloud-backup-export-prereqs-aws>` section. To learn more, see
       :ref:`set-up-unified-aws-access`.
     - Required

   * - ``requirePrivateNetworking``
     - Set to ``true`` to export snapshots to this bucket over
       |aws| PrivateLink. If set to ``true``, {+service+} uses the
       private endpoint you created in the :ref:`Prerequisites
       <cloud-backup-export-prereqs-aws>` section to export snapshots
       to the bucket over a private connection. Otherwise, set to
       ``false`` to export snapshots to the bucket over the public
       network.
     - Required

.. example::

   The following request body creates an export bucket
   configuration for an existing |aws| |s3| bucket named
   ``exemplary-bucket``. This {+service+} bucket configuration
   requires {+service+} to export all snapshots over a private
   endpoint.

   .. code-block:: javascript

      {
        "cloudProvider": "AWS",
        "iamRoleId": "668c5f0ed436263134491592",
        "bucketName": "exemplary-bucket",
        "requirePrivateNetworking": true
      }
