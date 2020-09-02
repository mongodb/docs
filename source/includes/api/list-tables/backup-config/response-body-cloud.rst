.. list-table::
   :widths: 20 14 66
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - authMechanismName
     - string
     - Name of the authentication mechanism to use when connecting to
       the sync source database. |mms| returns this parameter if the
       sync store uses authentication.

   * - clusterId
     - string
     - Unique identifier of the cluster to which this backup
       configuration applies.

   * - excludedNamespaces
     - array of strings
     - List of database names and collection names to omit from
       the backup. Each string is a namespace in the form of
       **{database}** or **{database}.{collection}**.

   * - includedNamespaces
     - array of strings
     - List of database names and collection names to include in
       the backup. Each string is a namespace in the form of
       **{database}** or **{database}.{collection}**.

   * - links
     - object array
     - .. include:: /includes/api/links-explanation.rst

   * - projectId
     - string
     - Unique identifier of the project that owns this backup
       configuration.

   * - provisioned
     - boolean
     - Flag that indicates if |mms| has provisioned the resources
       needed to store a backup. |mms| returns this parameter when the
       amount of data to be backed up exceeds a certain threshold.

   * - sslEnabled
     - boolean
     - Flag that indicates if |tls| is enabled for the sync source
       database.

   * - statusName
     - string
     - Current (or desired) status of the backup configuration.

   * - storageEngineName
     - string
     - Storage engine used for the backup.

