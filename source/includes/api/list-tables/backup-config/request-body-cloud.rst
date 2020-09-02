.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - authMechanismName
     - string
     - Conditional
     - Authentication mechanism needed to connect to the sync source
       database. |mms| requires this parameter if the sync store uses authentication. |mms| accepts:

       .. include:: /includes/api/lists/authMechanismName-values.rst

   * - excludedNamespaces
     - array of strings
     - Optional
     - List of database names and collection names to omit from the
       backup. Each string is a namespace in the form of **{database}**
       or **{database}.{collection}**.

       - You can set this parameter or **includedNamespaces**, not
         both.

       - You must send the new full list of excluded namespaces,
         including any that were already listed.

       - If your new list removes any namespaces from the previous
         list, set the **syncSource** parameter. Removing an excluded
         namespace necessitates a full resync. Without the
         **syncSource** parameter, the request fails.

       - If your new list only adds to the previous list, don't set
         **syncSource**.

   * - includedNamespaces
     - array of strings
     - Optional
     - List of database names and collection names to include in the
       backup. Each string is a namespace in the form of **{database}**
       or **{database}.{collection}**. |mms| doesn't backup any
       namespace **not listed** in this array.

       - You can set this parameter or **excludedNamespaces**, not
         both.

       - You must send the new full list of included namespaces,
         including any that were already listed.

       - If the new list removes any namespaces from the previous list,
         set the **syncSource** parameter. Removing an
         included namespace requires a full resync. Without the
         **syncSource** parameter, the request will fail.

       - If the new list only removes namespaces from the previous
         list, don't set **syncSource**.

   * - password
     - string
     - Conditional
     - Password to use to connect to the sync source database. |mms|
       requires this parameter when the sync store |mongod| instances
       require clients to authenticate.

   * - provisioned
     - boolean
     - Conditional
     - Flag that indicates if |mms| has provisioned the resources
       needed to store a backup.

   * - sslEnabled
     - boolean
     - Optional
     - Flag that indicates if |tls| is enabled for the sync source
       database.

   * - statusName
     - string
     - Optional
     - Current (or desired) status of the backup configuration. |mms|
       accepts:

       - **INACTIVE**
       - **PROVISIONING**
       - **STARTED**
       - **STOPPED**
       - **TERMINATING**

   * - storageEngineName
     - string
     - Optional
     - Storage engine used for the backup. |mms| accepts:

       - **MEMORY_MAPPED**
       - **WIRED_TIGER**

   * - syncSource
     - string
     - Conditional
     - |mongod| instance to get backup data from. |mms| accepts either
       a specific hostname or one of: **PRIMARY** and **SECONDARY**.

       |mms| requires this parameter if
       **"storageEngineName" : "WIRED_TIGER"**.

   * - username
     - string
     - Conditional
     - Name of the user to use to connect to the sync source database.
       |mms| requires this parameter when the sync store |mongod|
       instances require clients to authenticate.

       Send this parameter to |mms| when updating the backup
       configuration for a replica set or sharded cluster that |mms|
       *doesn't* manage.
