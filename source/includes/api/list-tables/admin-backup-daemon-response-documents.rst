.. list-table::
   :widths: 15 15 70
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``assignmentEnabled``
     - boolean
     - Flag indicating whether this :cloudmgr:`Backup Daemon </reference/glossary/#term-backup-daemon>` can be
       assigned backup jobs.

   * - ``backupJobsEnabled``
     - boolean
     - Flag indicating whether this :cloudmgr:`Backup Daemon </reference/glossary/#term-backup-daemon>` can be used
       to backup databases.

   * - ``configured``
     - boolean
     - Flag indicating whether this :cloudmgr:`Backup Daemon </reference/glossary/#term-backup-daemon>` is ready to
       use.

   * - ``garbageCollectionEnabled``
     - boolean
     - Flag indicating whether this :cloudmgr:`Backup Daemon </reference/glossary/#term-backup-daemon>` has garbage
       collection set.

   * - ``headDiskType``
     - string
     - Type of disk used to store the :term:`head directory`.

       The accepted values for this option are:

       - ``HDD``
       - ``SSD``

   * - ``id``
     - string
     - Unique identifier of this :cloudmgr:`Backup Daemon </reference/glossary/#term-backup-daemon>`.

   * - ``labels``
     - array of strings
     - Array of tags to manage which :term:`backup jobs <backup job>`
       |onprem| can assign to which
       :cloudmgr:`Backup Daemons </reference/glossary/#term-Backup-Daemon>`.

   * - ``links``
     - object array
     - .. include:: /includes/api/links-explanation.rst

   * - ``machine``
     - object
     - :cloudmgr:`Backup Daemon </reference/glossary/#term-backup-daemon>` host and its
       :term:`head directories <head directory>`.

   * - ``machine.headRootDirectory``
     - string
     - Root-relative path of the :term:`head directory` on this
       :cloudmgr:`Backup Daemon </reference/glossary/#term-backup-daemon>` host.

   * - ``machine.machine``
     - string
     - Hostname or IP address of the :cloudmgr:`Backup Daemon </reference/glossary/#term-backup-daemon>` host.

   * - ``numWorkers``
     - number
     - Number of worker processes that can perform tasks (i.e.
       backup, restore, or groom) for the :cloudmgr:`Backup Daemon </reference/glossary/#term-backup-daemon>`.

   * - ``resourceUsageEnabled``
     - boolean
     - Flag indicating whether this :cloudmgr:`Backup Daemon </reference/glossary/#term-backup-daemon>` has its
       resource usage monitored.

   * - ``restoreQueryableJobsEnabled``
     - boolean
     - Flag indicating whether this :cloudmgr:`Backup Daemon </reference/glossary/#term-backup-daemon>` can perform
       :doc:`queryable restores </tutorial/query-backup>`.
