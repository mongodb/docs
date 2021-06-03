.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - source
     - object
     - Required
     - Document that describes the |com| source of the migrating
       cluster.

   * - source.clusterName
     - string
     - Required
     - Human-readable label that identifies the source |com| cluster.

   * - source.groupId
     - string
     - Required
     - Unique 24-hexadecimal digit string that identifies the source
       project.

   * - source.username
     - string
     - Optional
     - Human-readable label that identifies the SCRAM-SHA user that
       connects to the source |com| cluster. Omit this value if
       **"source.managedAuthentication" : true**.

   * - source.password
     - string
     - Optional
     - Password that authenticates the username to the source |com|
       cluster. Omit this value if **"source.managedAuthentication" :
       true**.

   * - source.ssl
     - boolean
     - Required
     - Flag that indicates whether you have |tls| enabled.

   * - source.caCertificatePath
     - string
     - Optional
     - Path to the CA certificate that signed |tls| certificates use to
       authenticate to the source |com| cluster. Omit this value if
       **"source.ssl" : false**.

   * - source.managedAuthentication
     - boolean
     - Required
     - Flag that indicates whether MongoDB Automation manages
       authentication to the source |com| cluster. If you set this to
       **true**, don't provide values for **source.username** and
       **source.password**.

   * - destination
     - object
     - Required
     - Settings that describe the |service| destination of the
       migrating |com| cluster.

   * - destination.groupId
     - string
     - Required
     - Unique 24-hexadecimal digit string that identifies the |service|
       destination project.

   * - destination.clusterName
     - string
     - Required
     - Human-readable label that identifies the |service| destination
       cluster.

   * - migrationHosts
     - array
     - Required
     - List of hosts running the MongoDB Agent that can transfer your
       MongoDB data from the source (|com|) to destination
       (|service|) deployments. Each live migration process uses its
       own dedicated migration host.

   * - dropEnabled
     - boolean
     - Required
     - Flag that indicates whether this process should drop existing
       collections from the destination (|service|) cluster given in
       **destination.clusterName** before starting the migration of
       data from the source cluster.
