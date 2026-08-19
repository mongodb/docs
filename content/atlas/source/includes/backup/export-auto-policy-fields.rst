.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Request Body Field
     - Value

   * - ``autoExportEnabled``
     - ``true``. This enables {+service+} to export {+Cloud-Backup+}
       Snapshots to the Export Bucket configured in ``export``.

   * - ``export.exportBucketId``
     - Unique identifier of the export bucket configuration that
       references the object storage location to export the backup
       snapshot to.

       To retrieve the ID for your export bucket configuration, see
       :ref:`cloud-backup-manage-snapshot-export`.

   * - ``export.frequencyType``
     - Frequency associated with the :ref:`backup policy item
       <configure-backup-policy>` that you want to export snapshots
       from. Value can be ``daily``, ``weekly``, ``monthly``, or
       ``yearly``.
