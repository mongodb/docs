.. list-table::
   :widths: 15 15 70
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - daemonFilter
     - object array
     - *Optional.* An array of pairs of :term:`Backup Daemon` hosts and 
       their :term:`head directories <head directory>` that to which  
       this project's backup jobs are limited. If omitted, all available 
       Backup Daemons are used.

   * - daemonFilter.headRootDirectory
     - string
     - *Optional.* The root-relative path of the :term:`head directory` 
       on this :term:`Backup Daemon` host.

   * - daemonFilter.machine
     - string
     - The host address for one :term:`Backup Daemon` host.

   * - id
     - string
     - The unique identifier that represents this project and its 
       backup job configuration.

   * - kmipClientCertPassword
     - string
     - *Optional.* The password that encrypts the 
       :abbr:`KMIP (Key Management Interoperability Protocol)`
       client certificate.

   * - kmipClientCertPath
     - string
     - *Optional.* The root-relative path on the :term:`Backup Daemon` 
       host that stores the 
       :abbr:`KMIP (Key Management Interoperability Protocol)`
       client certificate.

   * - labelFilter
     - array of strings
     - *Optional.* An array of tags that limits which 
       :term:`Backup Daemons <Backup Daemon>` and 
       :term:`snapshot stores <snapshot store>` can process 
       :term:`backup jobs <backup job>` for this project.

       If a snapshot store or any Backup Daemon has the same ``labels`` 
       set as this ``labelFilter``, they can process backup jobs for 
       this project.

       If omitted, the project's backup jobs can use any available 
       Backup Daemon or snapshot store.

   * - oplogStoreFilter
     - array of objects
     - *Optional.* An array of unique identifiers representing 
       :term:`Oplog stores <Oplog Store Database>` that may 
       be used with this project's backup jobs. If omitted, all 
       available oplog stores may be used.

   * - oplogStoreFilter.id
     - string
     - Unique identifier representing an
       :term:`oplog store <Oplog Store Database>` that may be used 
       with this project's backup jobs.

       Retrieve the ``id`` of the oplog store you want to use with 
       :ref:`Get All Oplog Configurations <get-all-oplog-configs-response>`.

   * - oplogStoreFilter.type
     - string
     - Type of :term:`oplog store <Oplog Store Database>` to use. The 
       only supported value is ``oplogStore``.

   * - snapshotStoreFilter
     - array of objects
     - *Optional.* Array of unique identifiers representing specific 
       :term:`snapshot stores <snapshot store>` and their types that can 
       be used with this project's backup jobs. If omitted, all 
       available snapshot stores are used.

   * - snapshotStoreFilter.id
     - string
     - *Optional.* The unique identifier representing specific 
       :term:`snapshot stores <snapshot store>` that can be 
       used with this project's backup jobs.

   * - snapshotStoreFilter.type
     - string
     - *Optional.* The type of the specific snapshot store given as 
       ``snapshotStoreFilter.id``.

       The accepted values for this option are:

       - ``s3blockstore``
       - ``blockstore``
       - ``fileSystemStore``

   * - syncStoreFilter
     - array of strings
     - *Optional.* An array of sync store filters that can be used with 
       this project's backup jobs. If omitted, all available sync stores
       are used.
