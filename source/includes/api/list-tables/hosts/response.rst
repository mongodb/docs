.. list-table::
   :widths: 20 14 66
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - aliases
     - array of strings
     - Array of alternate hostname and port combinations that |mms|
       discovered for the MongoDB process. These combinations can
       include hostnames, |fqdn|\s, |ipv4| addresses, and |ipv6|
       addresses.

   * - alertsEnabled
     - boolean
     - ``true`` if this MongoDB process has alerts enabled.

   * - authMechanismName
     - string
     - Authentication mechanism used to connect to this MongoDB
       process. This displays only one of the following values:

       .. include:: /includes/api/lists/authMechanismName-values.rst

   * - clusterId
     - string
     - Unique identifier of the cluster to which the MongoDB
       process belongs.

   * - created
     - date
     - Date |mms| created or first discovered this MongoDB process.

   * - groupId
     - string
     - Unique identifier of the :opsmgr:`group </reference/glossary/#term-group>` that owns this host.

   * - hasStartupWarnings
     - boolean
     - ``true`` if this MongoDB process had startup warnings.

   * - hidden
     - boolean
     - ``true`` if host is displayed in the |mms| UI. Hosts set to
       ``true`` are omitted from |api| responses.

   * - hiddenSecondary
     - boolean
     - ``true`` if this host is a 
       :manual:`hidden secondary </core/replica-set-hidden-member>`.

   * - hostEnabled
     - boolean
     - ``true`` if the MongoDB process currently enabled.

   * - hostname
     - string
     - Primary hostname as |mms| can best determine. This can be a
       hostname, an |fqdn|, an |ipv4| address, or an |ipv6| address.

   * - id
     - string
     - Unique identifier.

   * - ipAddress
     - string
     - |ipv4| or |ipv6| address associated with the ``hostname`` of
       this MongoDB process. Additional accessible |ipv4| or |ipv6|
       addresses may be displayed in the ``aliases`` array.

   * - journalingEnabled
     - boolean
     - ``true`` if journaling is enabled for this MongoDB process.

   * - lastDataSizeBytes
     - number
     - Uncompressed size of the host's databases on disk in
       bytes excluding indexes. ``lastDataSizeBytes`` *does not*
       include the data in the
       :manual:`local </reference/local-database>` database.

   * - lastIndexSizeBytes
     - number
     - Uncompressed size of the host's database indexes on disk
       in bytes. This number *does not* include the size of the
       index for the :manual:`local </reference/local-database>`
       database.

   * - lastPing
     - date
     - |iso8601-time| when the last ping for this MongoDB process
       was received.

   * - lastRestart
     - date
     - |iso8601-time| when this process last restarted. If the
       MongoDB process has never been restarted, the ``lastRestart``
       field is omitted.

   * - links
     - array
     - Array that includes one or more links to sub-resources and/or
       related resources. The relations between URLs are explained
       in the `Web Linking Specification
       <http://tools.ietf.org/html/rfc5988>`__. At minimum, a
       ``links`` array contains one link called ``self``.

   * - logsEnabled
     - boolean
     - ``true`` if |mms| is collecting logs for this MongoDB
       process.

   * - lowUlimit
     - boolean
     - ``true`` if this MongoDB process's host has a low ``ulimit``
       setting.

   * - port
     - number
     - Port on which the MongoDB process listens.

   * - profilerEnabled
     - boolean
     - ``true`` if |mms| collects profile information from this
       MongoDB process.

   * - replicaSetName
     - string
     - Name of the replica set this process belongs to. Only present
       if this process is part of a replica set.

   * - replicaStateName
     - string
     - Current state of this MongoDB process within a replica set.
       Only present if this process is part of a replica set. See
       :manual:`Replica Set Member States </reference/replica-states>`
       for possible values.

   * - shardName
     - string
     - Name of the shard to which this process belongs. Only present
       if the process is part of a sharded cluster.

   * - secondaryDelaySecs
     - number
     - Number of seconds this :manual:`replica set </reference/glossary/#std-term-replica-set>` member's data 
       trails the :manual:`primary </reference/glossary/#std-term-primary>`. If this value is set to ``0``, 
       the member is not configured as a delayed member. 
       For additional details on secondary delays, see 
       :manual:`Delayed Replica Set Members </core/replica-set-delayed-member>`

   * - sslEnabled
     - boolean
     - ``true`` if |tls-ssl| and is enabled for this MongoDB
       process.

   * - systemInfo
     - object
     - Object that contains RAM and CPU information for this MongoDB 
       process' server as reported by the operating system or 
       container.

   * - systemInfo.memSizeMB
     - number
     - Amount of RAM in megabytes.

   * - systemInfo.numCores
     - number
     - Number of CPU cores.

   * - typeName
     - string
     - Type for this MongoDB process. Possible values are:

       - ``STANDALONE``
       - ``REPLICA_PRIMARY``
       - ``REPLICA_SECONDARY``
       - ``REPLICA_ARBITER``
       - ``RECOVERING``
       - ``SHARD_MONGOS``
       - ``SHARD_CONFIG``
       - ``SHARD_STANDALONE``
       - ``SHARD_PRIMARY``
       - ``SHARD_SECONDARY``
       - ``NO_DATA``

       The type for new hosts added to |mms| will be ``NO_DATA``
       until the {+magent+} receives its first ping.

   * - uptimeMsec
     - number
     - Number of milliseconds since this process last restarted.

   * - version
     - string
     - Version of MongoDB running for this process.
