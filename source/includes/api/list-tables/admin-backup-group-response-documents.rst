.. list-table::
   :widths: 15 15 70
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - daemonFilter
     - object array
     - An array of pairs of :opsmgr:`Backup Daemon </reference/glossary/#term-backup-daemon>` hosts and 
       their :term:`head directories <head directory>` that to which  
       this project's backup jobs are limited.

   * - daemonFilter.headRootDirectory
     - string
     - The root-relative path of the :term:`head directory` on this 
       :opsmgr:`Backup Daemon </reference/glossary/#term-backup-daemon>` host.

   * - daemonFilter.machine
     - string
     - The host address for one :opsmgr:`Backup Daemon </reference/glossary/#term-backup-daemon>` host.

   * - id
     - string
     - The unique identifier that represents this project and its 
       backup job configuration.

   * - kmipClientCertPassword
     - string
     - The password that encrypts the 
       :abbr:`KMIP (Key Management Interoperability Protocol)`
       client certificate.

   * - kmipClientCertPath
     - string
     - The path to the directory on the :opsmgr:`Backup Daemon </reference/glossary/#term-backup-daemon>` host that 
       stores the :abbr:`KMIP (Key Management Interoperability Protocol)` 
       client certificate.

   * - links
     - object array
     - .. include:: /includes/api/links-explanation.rst

   * - labelFilter
     - array of strings
     - An array of tags that limits which 
       :opsmgr:`Backup Daemons </reference/glossary/#term-Backup-Daemon>` and 
       :opsmgr:`snapshot stores </reference/glossary/#term-snapshot-store>` can process 
       :term:`backup jobs <backup job>` for this project.

   * - oplogStoreFilter
     - array of objects
     - An array of unique identifiers representing 
       :opsmgr:`Oplog stores  </reference/glossary/#term-Oplog-Store-Database>` that may be used 
       with this project's backup jobs.

   * - oplogStoreFilter.id
     - string
     - Unique identifier representing an
       :opsmgr:`oplog store  </reference/glossary/#term-Oplog-Store-Database>` that may be used 
       with this project's backup jobs.

   * - oplogStoreFilter.type
     - string
     - Type of :opsmgr:`oplog store  </reference/glossary/#term-Oplog-Store-Database>` to use. This 
       value is always ``oplogStore``.

   * - snapshotStoreFilter
     - array of objects
     - Array of unique identifiers representing specific 
       :opsmgr:`snapshot stores </reference/glossary/#term-snapshot-store>` and their types that can 
       be used with this project's backup jobs. If omitted, all 
       available snapshot stores are used.

   * - snapshotStoreFilter.id
     - string
     - The unique identifier representing specific 
       :opsmgr:`snapshot stores </reference/glossary/#term-snapshot-store>` that can be 
       used with this project's backup jobs.

   * - snapshotStoreFilter.type
     - string
     - The type of the specific snapshot store given as 
       ``snapshotStoreFilter.id``.

       The accepted values for this option are:

       - ``s3blockstore``
       - ``blockstore``
       - ``fileSystemStore``

   * - syncStoreFilter
     - array of strings
     - An array of sync store filters that can be used with this 
       project's backup jobs. If omitted, all available sync stores 
       are used.
