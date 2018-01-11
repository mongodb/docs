.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - daemonFilter
     - array of objects
     - An array of pairs of Backup Daemon hosts and their head 
       directories that are included in this Backup Group.

   * - daemonFilter.headRootDirectory
     - string
     - The :term:`head directory` for one Backup Daemon host.

   * - daemonFilter.machine
     - string
     - The host address for one Backup Daemon host.

   * - id
     - string
     - The Unique Identifier that represents this Backup Group.

   * - kmipClientCertPassword
     - string
     - The password that encrypts the :abbr:`KMIP (Key Management Interoperability Protocol)`
       client certificate.

   * - kmipClientCertPath
     - string
     - The path to the directory on the Backup Daemon host that 
       stores the :abbr:`KMIP (Key Management Interoperability Protocol)` 
       client certificate.

   * - links
     - array of objects
     - .. include:: /includes/api/links-explanation.rst

   * - labelFilter
     - array of strings
     - An array of snapshot store labels that are included in this
       Backup Group.

   * - oplogStoreFilter
     - array of strings
     - An array of oplog IDs that are included in this Backup Group.

   * - snapshotStoreFilter
     - array of objects
     - Array of specific snapshot stores and their types that are
       included in this Backup Group.

   * - snapshotStoreFilter.id
     - string
     - The ID of a specific snapshot stores that is included in this 
       Backup Group.

   * - snapshotStoreFilter.type
     - string
     - The types of the specific snapshot store that is included in
       this Backup Group.

   * - syncStoreFilter
     - array of strings
     - An array of sync store filters that are included in this 
       Backup Group.
