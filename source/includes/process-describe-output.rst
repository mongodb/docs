.. list-table::
      :header-rows: 1
      :widths: 20 10 70
   
      * - Name
        - Type
        - Description

      * - ``aliases``
        - array of strings
        - Array of alternate hostname and port combinations that |mms| 
          discovered for the process. These combinations can include 
          hostnames, |fqdn|\s, |ipv4| addresses, and |ipv6| addresses.

      * - ``authMechanism``
        - string
        - Authentication mechanism used to connect to this 
          process. This displays one of the following values:

          - ``SCRAM_SHA_1``
          - ``GSSAPI``
          - ``PLAIN``
          - ``MONGODB_X509``
          - ``NONE``

      * - ``clusterId``
        - string
        - ID of the cluster that owns this process.
 
      * - ``created``
        - string
        - |iso8601-time| when this process was created or first 
          discovered by |mms|.
   
      * - ``groupId``
        - string
        - ID of the project that owns this process.
 
      * - ``hostname``
        - string
        - Hostname of the machine running this process.
 
      * - ``id``
        - string
        - ID of this process.

      * - ``ipAddress``
        - string
        - |ipv4| or |ipv6| address associated with the hostname of this 
          process. Additional accessible |ipv4| or |ipv6| addresses may 
          be displayed in the aliases array.
 
      * - ``lastPing``
        - string
        - |iso8601-time| when the last ping for this process was 
          received.

      * - ``lastRestart``
        - string
        - |iso8601-time| when this process last restarted. Omitted if 
          this process has never been restarted.

      * - ``replicaSetName``
        - string
        - Name of the 
          :manual:`replica set </reference/glossary/#term-replica-set` 
          to which this process belongs. Only present if this process 
          is part of a replica set.

      * - ``replicaStateName``
        - string
        - Current state of this process within a replica set. Only 
          present if this process is part of a replica set. See 
          :manual:`Replica Set Member States </reference/replica-states/>` for possible values.

      * - ``shardName``
        - string
        - Name of the :manual:`shard </reference/glossary/#term-shard>` 
          to which this process belongs. Only present if the process is 
          part of a 
          :manual:`sharded cluster </reference/glossary/#term-sharded-cluster>`.
 
      * - ``typeName``
        - string
        - Type of process. Possible values are:
   
          - ``REPLICA_PRIMARY``
          - ``REPLICA_SECONDARY``
          - ``RECOVERING``
          - ``SHARD_MONGOS``
          - ``SHARD_CONFIG``
          - ``SHARD_STANDALONE``
          - ``SHARD_PRIMARY``
          - ``SHARD_SECONDARY``
          - ``NO_DATA``

          The type for new processes is ``NO_DATA`` until deployment of 
          the process is complete.
   
      * - ``version``
        - string
        - Version of MongoDB running for this process.

      * - ``deactivated``
        - boolean
        - ``true`` if this process is deactivated; ``false`` if this 
          process is running.

      * - ``hasStartupWarnings``
        - boolean
        - ``true`` if this process has startup warnings.

      * - ``hidden``
        - boolean
        - ``true`` if host is displayed in the Ops Manager UI. 
          Processes set to ``true`` are omitted from the response.

      * - ``hiddenSecondary``
        - boolean
        - ``true`` if this host is a 
          :manual:`hidden secondary </core/replica-set-hidden-member/>`.

      * - ``hostEnabled``
        - boolean
        - ``true`` if this process is currently enabled.

      * - ``journalingEnabled``
        - boolean
        - ``true`` if journaling is enabled for this process.

      * - ``lowULimit``
        - boolean
        - ``true`` if this process’s host has a low 
          :manual:`ulimit </reference/ulimit/>` setting.

      * - ``logsEnabled``
        - boolean
        - ``true`` if |mms| is collecting logs for this process.

      * - ``alertsEnabled``
        - boolean
        - ``true`` if this process has alerts enabled.

      * - ``profilerEnabled``
        - boolean
        - ``true`` if |mms| collects profile information from this 
          process.

      * - ``sslEnabled``
        - boolean
        - ``true`` if |tls| or |ssl| is enabled for this process. 

      * - ``lastDataSizeBytes``
        - number
        - Uncompressed size of the host’s databases on disk in bytes 
          excluding indexes. ``lastDataSizeBytes`` *does not* include 
          the data in the :manual:`local </reference/local-database/>` 
          database.

      * - ``lastIndexSizeBytes``
        - number
        - Uncompressed size of the host’s database indexes on disk in 
          bytes. This number *does not* include the size of the index 
          for the :manual:`local </reference/local-database/>` 
          database. 

      * - ``port``
        - number
        - Port on which this process listens.

      * - ``slaveDelaySec``
        - number
        - Number of seconds this replica set member’s data trails the 
          :manual:`primary </reference/glossary/#term-primary>`. If 
          this value is set to ``0``, the member is not configured as a 
          delayed member. For additional details on slave delays, see 
          :manual:`Delayed Replica Set Members </core/replica-set-delayed-member/>`.

      * - ``uptimeMsec``
        - number
        - Number of milliseconds since this process last restarted.

      * - ``links``
        - array of objects``
        - Array that includes one or more links to sub-resources and/or 
          related resources. The relations between URLs are explained 
          in the 
          `Web Linking Specification <https://tools.ietf.org/html/rfc5988>`__. 
          At minimum, a ``links`` array contains one link called 
          ``self``.
