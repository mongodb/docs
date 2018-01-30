.. list-table::
   :widths: 15 15 70
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - assignmentEnabled
     - boolean
     - *Optional.* Flag indicating whether this :term:`Backup Daemon` 
       can be assigned backup jobs.

   * - backupJobsEnabled
     - boolean
     - *Optional.* Flag indicating whether this :term:`Backup Daemon` 
       can be used to backup databases.

   * - configured
     - boolean
     - *Optional.* Flag indicating whether this :term:`Backup Daemon` 
       is ready to use.

   * - garbageCollectionEnabled
     - boolean
     - *Optional.* Flag indicating whether this :term:`Backup Daemon` 
       has garbage collection set.

   * - headDiskType
     - string
     - *Optional.* The type of disk used to store the 
       :term:`head directory`.

       The accepted values for this option are:

       - ``HDD``
       - ``SSD``

   * - labels
     - array of strings
     - *Optional.* Array of tags to manage which 
       :term:`backup jobs <backup job>` |onprem| can assign to which 
       :term:`Backup Daemons <Backup Daemon>`. 

       Setting these tags limits which backup jobs this Backup Daemon 
       can process. If omitted, this Backup Daemon can only process 
       backup jobs for projects that do not use labels to filter their 
       jobs. 

   * - machine
     - object
     - :term:`Backup Daemon` host and its 
       :term:`head directories <head directory>`.

   * - machine.headRootDirectory
     - string
     - *Optional.* The root-relative 
       `URL-encoded path <https://en.wikipedia.org/wiki/Percent-encoding?oldid=810929127>`_ 
       of the :term:`head directory` on this :term:`Backup Daemon` 
       host.

       .. note:: 
          Requests should encode slashes in the URL path. 

          .. example:: 

             For Linux platforms, the head directory would be added in 
             this format:

             .. code-block:: sh

                http://localhost:8080/api/public/v1.0/admin/backup/daemon/config/localhost/%2Fdata%2Fbackup%2F

   * - machine.machine
     - string
     - The hostname or IP address of the :term:`Backup Daemon` host.

   * - numWorkers
     - number
     - *Optional.* The number of worker processes that can perform tasks 
       (i.e. backup, restore, or groom) for the :term:`Backup Daemon`.

   * - resourceUsageEnabled
     - boolean
     - *Optional.* Flag indicating whether this :term:`Backup Daemon` 
       has its resource usage monitored.

   * - restoreJobsEnabled
     - boolean
     - *Optional.* Flag indicating whether this :term:`Backup Daemon` 
       can be used to restore snapshots.

   * - restoreQueryableJobsEnabled
     - boolean
     - *Optional.* Flag indicating whether this :term:`Backup Daemon` 
       can perform :doc:`queryable restores </tutorial/query-backup>`.
