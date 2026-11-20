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
     - Flag indicating whether this :opsmgr:`Backup Daemon </reference/glossary/#std-term-backup-daemon>` can be
       assigned backup jobs.

   * - ``backupJobsEnabled``
     - boolean
     - Optional
     - Flag indicating whether this :opsmgr:`Backup Daemon </reference/glossary/#std-term-backup-daemon>` can be used
       to backup databases.

   * - ``configured``
     - boolean
     - Optional
     - Flag indicating whether this :opsmgr:`Backup Daemon </reference/glossary/#std-term-backup-daemon>` is ready to
       use.

   * - ``garbageCollectionEnabled``
     - boolean
     - Optional
     - Flag indicating whether this :opsmgr:`Backup Daemon </reference/glossary/#std-term-backup-daemon>` has garbage
       collection set.

   * - ``headDiskType``
     - string
     - Optional
     - Type of disk used to store the :term:`head directory`.

       The accepted values for this option are:

       - ``HDD``
       - ``SSD``

   * - ``labels``
     - array of strings
     - Optional
     - Array of tags to manage which
       :term:`backup jobs <backup job>` |onprem| can assign to which
       :opsmgr:`Backup Daemons </reference/glossary/#std-term-Backup-Daemon>`.

       Setting these tags limits which backup jobs this Backup Daemon
       can process. If omitted, this Backup Daemon can only process
       backup jobs for projects that do not use labels to filter their
       jobs.

   * - ``machine``
     - object
     - Required
     - :opsmgr:`Backup Daemon </reference/glossary/#std-term-backup-daemon>` host and its
       :term:`head directories <head directory>`.

   * - ``machine.headRootDirectory``
     - string
     - Optional
     - Root-relative path of the :term:`head directory` on this
       :opsmgr:`Backup Daemon </reference/glossary/#std-term-backup-daemon>` host.
       Accepts paths with or without a trailing slash. |onprem|
       normalizes the path to the canonical form, with exactly one
       trailing slash, and always stores and returns that form.
       Multiple trailing slashes collapse to one. For example, if
       you submit ``/data`` or ``/data//``, |onprem| stores and
       returns ``/data/``. Lookups accept any spelling and match
       the canonical form.

   * - ``machine.machine``
     - string
     - Required
     - Hostname or IP address of the :opsmgr:`Backup Daemon </reference/glossary/#std-term-backup-daemon>` host.

   * - ``numWorkers``
     - number
     - Optional
     - Number of worker processes that can perform tasks
       (that is, backup, restore, or groom) for the :opsmgr:`Backup Daemon </reference/glossary/#std-term-backup-daemon>`.

   * - ``resourceUsageEnabled``
     - boolean
     - Optional
     - Flag indicating whether this :opsmgr:`Backup Daemon </reference/glossary/#std-term-backup-daemon>` has its
       resource usage monitored.

   * - ``restoreQueryableJobsEnabled``
     - boolean
     - Optional
     - Flag indicating whether this :opsmgr:`Backup Daemon </reference/glossary/#std-term-backup-daemon>` can perform
       :ref:`queryable restores <om-query-backup>`.
