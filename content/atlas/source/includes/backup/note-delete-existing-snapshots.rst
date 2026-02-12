.. note:: 
   
   Updates made with this method only apply to snapshot copies created
   after February 11, 2026. To delete snapshot copies created before
   this date, you must use the ``deleteCopiedBackups`` option in a
   ``PATCH`` request to the {+atlas-admin-api+}
   :oas-atlas-op:`/backup/schedule </updateGroupClusterBackupSchedule>`
   endpoint. Alternatively, you can delete the original snapshots
   associated with the snapshot copies to delete the copies.