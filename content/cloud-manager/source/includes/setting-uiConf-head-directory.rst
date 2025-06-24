.. setting:: Head directory

   *Type*: string

   If the directory is already configured, the path is listed in the
   :guilabel:`Server` column.
   
   The dedicated disk partition on the Backup Daemon's server where the
   daemon stores the :cloudmgr:`head databases </reference/glossary/#std-term-head-database>`. The daemon
   maintains a head database for each shard or replica set it backs up.
   This directory must be writable by the mongodb-mms user and must end
   in a trailing slash. It is critical that this partition is sized
   appropriately.
   
   .. important::
      
      Data in this directory is dynamically created, maintained and
      destroyed by the Backup Daemon. This partition should not be used
      for any other purpose. This partition should *not* overlap with
      the partition used for the Backup Database.
   
      .. include:: /includes/head-database-backup-deprecated.rst
   

