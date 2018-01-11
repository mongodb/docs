.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - assignmentEnabled
     - boolean
     - Flag indicating whether this Backup Daemon can be assigned backup 
       jobs.

   * - backupJobsEnabled
     - boolean
     - Flag indicating whether this Backup Daemon can be used to backup 
       databases.

   * - configured
     - boolean
     - Flag indicating whether this Backup Daemon is ready to use.

   * - garbageCollectionEnabled
     - boolean
     - Flag indicating whether this Backup Daemon has garbage collection 
       set.

   * - headDiskType
     - string
     - The type of disk used to store the head directory.

   * - labels
     - array of strings
     - Array of names that snapshot stores used to be assigned to this 
       Backup Daemon.

   * - machine
     - array of strings
     - Array of Backup Daemon hosts and their head directories.

   * - machine.headRootDirectory
     - string
     - *Optional.* The head directory location found on this Backup 
       Daemon host.

       .. note:: 
          Requests should encode slashes in the URL path. 

          .. example:: 

             http://localhost:8080/api/public/v1.0/admin/backup/daemon/config/localhost/%2Ffoo%2Fbar%2F

   * - machine.machine
     - string
     - The hostname or IP address of the Backup Daemon host.

   * - numWorkers
     - number
     - The number of worker processes that can perform tasks (i.e. 
       backup, restore, or groom) for the Backup Daemon.

   * - resourceUsageEnabled
     - boolean
     - Flag indicating whether this Backup Daemon has its resource usage 
       monitored.

   * - restoreJobsEnabled
     - boolean
     - Flag indicating whether this Backup Daemon can be used to restore 
       snapshots.

   * - restoreQueryableJobsEnabled
     - boolean
     - Flag indicating whether this Backup Daemon can perform quearyable 
       restores.
