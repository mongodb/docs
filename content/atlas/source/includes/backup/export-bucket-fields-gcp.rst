.. list-table::
   :header-rows: 1
   :widths: 25 60 15

   * - Request Body Field
     - Value
     - Necessity

   * - ``cloudProvider``
     - ``GCP``
     - Required

   * - ``bucketName``
     - Name of the {+gcs+} Bucket that is authorized to receive
       |service| {+Cloud-Backup+} snapshots. To set up |service|
       access to this bucket, see the :ref:`Prerequisites
       <cloud-backup-export-prereqs-gcp>` section.
     - Required

   * - ``roleId``
     - Unique 24-hexadecimal digit string that identifies the {+gcp+}
       Provider Access Role that |service| uses to access the {+gcs+}
       bucket.
     - Required
