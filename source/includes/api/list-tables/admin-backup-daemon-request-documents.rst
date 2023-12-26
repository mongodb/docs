.. list-table::
   :widths: 15 10 10 65
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - ``assignmentEnabled``
     - boolean
     - Optional
     - Flag indicating whether this :cloudmgr:`Backup Daemon </reference/glossary/#std-term-backup-daemon>` can be
       assigned backup jobs.

   * - ``backupJobsEnabled``
     - boolean
     - Optional
     - Flag indicating whether this :cloudmgr:`Backup Daemon </reference/glossary/#std-term-backup-daemon>` can be used
       to backup databases.

   * - ``configured``
     - boolean
     - Optional
     - Flag indicating whether this :cloudmgr:`Backup Daemon </reference/glossary/#std-term-backup-daemon>` is ready to
       use.

   * - ``garbageCollectionEnabled``
     - boolean
     - Optional
     - Flag indicating whether this :cloudmgr:`Backup Daemon </reference/glossary/#std-term-backup-daemon>` has garbage
       collection set.

   * - ``headDiskType``
     - string
     - Optional
     - Type of disk used to store the :term:`head directory`.

       The accepted values for this option are:

       - ``HDD``
       - ``SSD``

   * - ``id``
     - string
     - Required
     - Unique identifier of this :cloudmgr:`Backup Daemon </reference/glossary/#std-term-backup-daemon>`.

   * - ``labels``
     - array of strings
     - Optional
     - Array of tags to manage which
       :term:`backup jobs <backup job>` |onprem| can assign to which
       :cloudmgr:`Backup Daemons </reference/glossary/#std-term-Backup-Daemon>`.

       Setting these tags limits which backup jobs this Backup Daemon
       can process. If omitted, this Backup Daemon can only process
       backup jobs for projects that do not use labels to filter their
       jobs.

   * - ``machine``
     - object
     - Required
     - :cloudmgr:`Backup Daemon </reference/glossary/#std-term-backup-daemon>` host and its
       :term:`head directories <head directory>`.

   * - ``machine.headRootDirectory``
     - string
     - Optional
     - Root-relative path of the :term:`head directory` on this
       :cloudmgr:`Backup Daemon </reference/glossary/#std-term-backup-daemon>` host. This directory must end with a slash
       (``/``). If you omit the slash, the Backup Daemon generates a
       Java Exception error.

   * - ``machine.machine``
     - string
     - Required
     - Hostname or IP address of the :cloudmgr:`Backup Daemon </reference/glossary/#std-term-backup-daemon>` host.

   * - ``numWorkers``
     - number
     - Optional
     - Number of worker processes that can perform tasks
       (i.e. backup, restore, or groom) for the :cloudmgr:`Backup Daemon </reference/glossary/#std-term-backup-daemon>`.

   * - ``resourceUsageEnabled``
     - boolean
     - Optional
     - Flag indicating whether this :cloudmgr:`Backup Daemon </reference/glossary/#std-term-backup-daemon>` has its
       resource usage monitored.

   * - ``restoreQueryableJobsEnabled``
     - boolean
     - Optional
     - Flag indicating whether this :cloudmgr:`Backup Daemon </reference/glossary/#std-term-backup-daemon>` can perform
       :doc:`queryable restores </tutorial/query-backup>`.
