.. list-table::
   :widths: 15 15 70
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - assignmentEnabled
     - boolean
     - Flag indicating whether this :term:`Backup Daemon` 
       can be assigned backup jobs.

   * - backupJobsEnabled
     - boolean
     - Flag indicating whether this :term:`Backup Daemon` 
       can be used to backup databases.

   * - configured
     - boolean
     - Flag indicating whether this :term:`Backup Daemon` 
       is ready to use.

   * - garbageCollectionEnabled
     - boolean
     - Flag indicating whether this :term:`Backup Daemon` 
       has garbage collection set.

   * - headDiskType
     - string
     - The type of disk used to store the :term:`head directory`.

       The accepted values for this option are:

       - ``HDD``
       - ``SSD``

   * - id
     - string
     - The unique identifier of this :term:`Backup Daemon`.

   * - labels
     - array of strings
     - Array of tags to manage which 
       :term:`backup jobs <backup job>` |onprem| can assign to which 
       :term:`Backup Daemons <Backup Daemon>`. 

   * - links
     - array of objects
     - .. include:: /includes/api/links-explanation.rst

   * - machine
     - object
     - :term:`Backup Daemon` host and its 
       :term:`head directories <head directory>`.

   * - machine.headRootDirectory
     - string
     - The root-relative path of the :term:`head directory` on this 
       :term:`Backup Daemon` host.

   * - machine.machine
     - string
     - The hostname or IP address of the :term:`Backup Daemon` host.

   * - numWorkers
     - number
     - The number of worker processes that can perform tasks (i.e. 
       backup, restore, or groom) for the :term:`Backup Daemon`.

   * - resourceUsageEnabled
     - boolean
     - Flag indicating whether this :term:`Backup Daemon` has its 
       resource usage monitored.

   * - restoreJobsEnabled
     - boolean
     - Flag indicating whether this :term:`Backup Daemon` can be used 
       to restore snapshots.

   * - restoreQueryableJobsEnabled
     - boolean
     - Flag indicating whether this :term:`Backup Daemon` can perform 
       :doc:`queryable restores </tutorial/query-backup>`.
