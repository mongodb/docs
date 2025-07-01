The **processes** array determines the configuration of your MongoDB
instances. Using this array, you can:

- Restore an instance.
- Start an :manual:`initial sync </core/replica-set-sync/#replica-set-initial-sync>`
  process on one or more MongoDB instances.


.. code-block:: yaml
   :linenos:

   "processes": [{
     "<args>": {},
     "alias": "<string>",
     "authSchemaVersion": "<integer>",
     "backupRestoreUrl": "<string>",
     "cluster": "<string>",
     "defaultRWConcern": {
       "defaultReadConcern": {
         "level": "<string>"
       },
       "defaultWriteConcern": {
         "j": "<boolean>",
         "w": "<string>",
         "wtimeout": "<integer>"
       }
     }
     "disabled": "<Boolean>",
     "featureCompatibilityVersion": "<string>",
     "hostname": "<string>",
     "lastCompact" : "<dateInIso8601Format>",
     "lastRestart" : "<dateInIso8601Format>",
     "lastResync" : "<dateInIso8601Format>",
     "lastKmipMasterKeyRotation" : "<dateInIso8601Format>",
     "logRotate": {
       "sizeThresholdMB": "<number>",
       "timeThresholdHrs": "<integer>",
       "numUncompressed": "<integer>",
       "percentOfDiskspace": "<number>",
       "numTotal": "<integer>"
     },
     "manualMode": "<Boolean>",
     "name": "<string>",
     "numCores": "<integer>",
     "processType": "<string>",
     "version": "<string>"
   }]

.. list-table::
   :widths: 12 10 10 68
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - processes
     - array
     - Required
     - Contains objects that define the |mongos| and |mongod| instances
       that |mms| monitors. Each object defines a different instance.

   * - processes[n].args2_6
     - object
     - Required
     - MongoDB configuration object for MongoDB versions 2.6 and later.

       The ``processes.args2_6`` object accepts most MongoDB 
       settings and parameters for MongoDB versions 2.6 and later. 
       To learn more, see :ref:`om-unsupported-mdb-settings`.

   * - processes[n].alias
     - string
     - Optional
     - Hostname alias (often a |dns| CNAME) for the host on which the
       process runs. If an alias is specified, the {+mdbagent+} prefers
       this alias over the hostname specified in **processes.hostname**
       when connecting to the host. You can also specify this alias in
       **replicaSets.host** and **sharding.configServer**.

   * - processes[n].authSchemaVersion
     - integer
     - Required
     - Schema version of the user credentials for MongoDB database
       users. This should match all other elements of the **processes**
       array that belong to the same cluster.

       - |mms| accepts **3** and **5** for this parameter.
       - MongoDB 3.x and 4.x clusters default to **5**.
       - MongoDB 2.6 clusters default to  **3**.

       To learn more, see :manual:`SCRAM 
       </core/security-scram/>` in the database manual.

   * - processes[n].backupRestoreUrl
     - string
     - Optional
     - Delivery |url| for the restore. |mms| sets this when creating a
       restore. To cancel an in-progress restore operation, set this
       option to ``CANCEL``.

       To learn more, see :doc:`/tutorial/automate-backup-restoration-with-api`.

   * - processes[n].cluster
     - string
     - Conditional
     - Name of the sharded cluster. Set this value to the same value in
       the **sharding.name** parameter in the **sharding** array for
       the |mongos|.

       - *Required* for a |mongos|.
       - *Not needed* for a |mongod|.

   * - defaultRWConcern.defaultReadConcern.level
     - string
     - Optional
     - Consistency and isolation properties set for the data read from
       replica sets and replica set shards. |service| accepts the following values:

       - "available"
       - "local"
       - "majority"

   * - defaultRWConcern.defaultWriteConcern.j
     - boolean
     - Optional
     - Flag that indicates whether the write acknowledgement must be
       written to the
       :manual:`on-disk journal </reference/write-concern/#j-option>`.

   * - defaultRWConcern.defaultWriteConcern.w
     - string
     - Optional
     - Desired number of mongod instances that must acknowledge a write
       operation in a replica sets and replica set shards. |service| accepts the
       :manual:`following values </reference/write-concern/#w-option>`:

       - Any number 0 or greater
       - "majority"

   * - defaultRWConcern.defaultWriteConcern.wtimeout
     - number
     - Optional
     - :manual:`Desired time limit for the write concern </reference/write-concern/#wtimeout>`
       expressed in milliseconds. Set this value when you set
       **defaultRWConcern.defaultWriteConcern.w** to a value greater
       than **1**.

   * - processes[n].disabled
     - Boolean
     - Optional
     - Flag that indicates if this process should be shut down. Set to
       **true** to shut down the process.

   * - processes[n].featureCompatibilityVersion
     - string
     - Required
     - Version of MongoDB with which this process has feature
       compatibility. Changing this value can enable or disable certain
       features that persist data incompatible with MongoDB versions
       earlier or later than the **featureCompatibilityVersion** you
       choose.

       - |mms| accepts {+fcv-list+} as parameter values. If you have an
         existing deployment, |mms| only accepts a
         **featureCompatibilityVersion** equal to or one release older
         than the MongoDB version you deployed. To learn which of
         these parameter values is supported for each MongoDB version,
         and which features each of these values enable or disable,
         see :manual:`setFeatureCompatibilityVersion
         </reference/command/setFeatureCompatibilityVersion/>` in the
         MongoDB Manual.
       - |mms| sets this parameter to match the MongoDB version for new
         deployments.
       - |mms| doesn't automatically increment this parameter when you
         upgrade a host from one MongoDB version to the next.

       To learn more, see :manual:`setFeatureCompatibilityVersion </reference/command/setFeatureCompatibilityVersion/#dbcmd.setFeatureCompatibilityVersion>`.

   * - processes[n].hostname
     - string
     - Required
     - Name of the host that serves this process. This defaults to
       **localhost**.

   * - processes[n].lastCompact
     - string
     - Optional
     - |iso8601-time| when |mms| last reclaimed free space on a
       cluster's disks. During certain operations, MongoDB might move
       or delete data but it doesn't free the currently unused space. |mms|
       reclaims the disk space in a rolling fashion across members of
       the replica set or shards.

       To reclaim this space:

       - Immediately, set this value to the current time as an
         |iso8601| timestamp.
       - Later, set this value to a future |iso8601| timestamp. |mms|
         reclaims the space after the current time passes the provided
         timestamp.

       To remove any ambiguity as to when you intend to reclaim the
       space on the cluster's disks, specify a time zone with your
       |iso8601| timestamp. For example, to set
       **processes.lastCompact**
       to 28 January 2021 at  2:43:52 PM US Central Standard Time, use
       ``"processes.lastCompact" : "2021-01-28T14:43:52-06:00"``

   * - processes[n].lastRestart
     - string
     - Optional
     - |iso8601-time| when |mms| last restarted this process. If you
       set this parameter to the current timestamp, |mms| forces a
       restart of this process after you upload this configuration.
       If you set this parameter for multiple processes in the same
       cluster, the |mms| restarts the selected processes in a rolling
       fashion across members of the replica set or shards.

   * - processes[n].lastResync
     - string
     - Optional
     - |iso8601-time| of the last
       :manual:`initial sync </core/replica-set-sync/#replica-set-initial-sync>`
       process that |mms| performed on the node.
       
       To trigger the init sync process on the node immediately, set
       this value to the current time as an |iso8601| timestamp.

       :red:`WARNING:` Use this parameter with caution. During
       :manual:`initial sync </core/replica-set-sync/#replica-set-initial-sync>`, Automation removes the entire
       contents of the node's ``dbPath`` directory.

       If you set this parameter:

       - On the secondary node, the {+mdbagent+} checks whether the
         specified timestamp is later than the time of the last resync,
         and if confirmed, starts init sync on this node.
         
         For example, to set ``processes.lastResync`` on the secondary node to 28
         May 2021 at 2:43:52 PM US CentralStandard Time, use:

         ``"processes.lastResync" : "2021-05-28T14:43:52-06:00"``
            
         If the {+mdbagent+} confirms that this timestamp is later
         than the recorded time of the last resync, it starts init
         sync on the node.

       - On the primary node, the {+mdbagent+} waits until you ask the
         primary node to become the secondary with the
         :method:`rs.stepDown` method, and then starts init sync on
         this node.

       - On all of the nodes in the same cluster, including the
         primary, the {+mdbagent+} checks whether the specified
         timestamp is later than the time of the last resync, and if
         confirmed, starts init sync on the secondary nodes in a
         rolling fashion. The {+mdbagent+} waits until you ask the
         primary node to become the secondary with the
         :method:`rs.stepDown` method, and then starts init sync on
         this node.

       To learn more, see :manual:`Initial Sync </core/replica-set-sync/#replica-set-initial-sync>`.

   * - processes[n].lastKmipMasterKeyRotation
     - string
     - Optional
     - |iso8601-time| when |mms| last rotated the master |kmip| key. If
       you set this parameter to the current timestamp, |mms| rotate the key after you upload this configuration.

   * - processes[n].logRotate
     - object
     - Optional
     - MongoDB configuration object for rotating the MongoDB logs of a
       process.

   * - processes[n].logRotate.
       numTotal
     - integer
     - Optional
     - Total number of log files that |mms| retains. If you don't set
       this value, the total number of log files defaults to **0**.
       |mms| bases rotation on your other **processes.logRotate**
       settings.

   * - processes[n].logRotate.
       numUncompressed
     - integer
     - Optional
     - Maximum number of total log files to leave uncompressed,
       including the current log file. The default is **5**.

   * - processes[n].logRotate.
       percentOfDiskspace
     - number
     - Optional
     - Maximum percentage of total disk space that |mms| can use to
       store the log files expressed as decimal. If this limit is
       exceeded, |mms| deletes compressed log files until it meets this
       limit. |mms| deletes the oldest log files first.

       The default is **0.02**.

   * - processes[n].logRotate.
       sizeThresholdMB
     - number
     - Required
     - Maximum size in MB for an individual log file before |mms|
       rotates it. |mms| rotates the log file immediately if it meets
       the value given in either this **sizeThresholdMB** or the
       **processes.logRotate.timeThresholdHrs** limit.

   * - processes[n].logRotate.
       timeThresholdHrs
     - integer
     - Required
     - Maximum duration in hours for an individual log file before the
       next rotation. The time is since the last rotation.

       |mms| rotates the log file once the file meets either this
       **timeThresholdHrs** or the
       **processes.logRotate.sizeThresholdMB** limit.

   * - processes[n].manualMode
     - Boolean
     - Optional
     - Flag that indicates if {+mdbagent+} automates this process.

       - This defaults to **false**.
       - Set to **true** to disable Automation on this process. The
         {+mdbagent+} takes no further actions on this process.
       - Set to **false** to enable Automation on this process. The
         {+mdbagent+} automates actions on this process.

   * - processes[n].name
     - string
     - Required
     - Unique name to identify the instance.

   * - processes[n].numCores
     - integer
     - Optional
     - Number of cores that |mms| should bind to this process. The
       {+mdbagent+} distributes processes across the cores as evenly as
       possible.

   * - processes[n].processType
     - string
     - Required
     - Type of MongoDB process being run. |mms| accepts |mongod| or
       |mongos| for this parameter.

   * - processes[n].version
     - string
     - Required
     - Name of the **mongoDbVersions** specification used with this
       instance.

