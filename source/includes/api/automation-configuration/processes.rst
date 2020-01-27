The ``processes`` array determines the configuration of your MongoDB
instances. You can restore an instance using this array.

.. code-block:: yaml

   "processes": [{
     "<args>": "<object>",
     "alias": "<string>",
     "backupRestoreUrl": "<string>",
     "authSchemaVersion": "<integer>",
     "cluster": "<string>",
     "disabled": "<Boolean>",
     "featureCompatibilityVersion": "<string>",
     "hostname": "<string>",
     "lastCompact" : "<dateInIso8601Format>",
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
   :widths: 15 10 10 65
   :header-rows: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - ``processes``
     - array of objects
     - Required
     - Contains objects that define the |mongos| and |mongod| instances
       that |mms| monitors. Each object defines a different instance.

   * - | ``processes``
       | ``.args2_6``
     - object
     - Required
     - MongoDB configuration object for MongoDB versions 2.6 and later.

       .. seealso::

          :doc:`Supported configuration options </reference/cluster-configuration-process-options>`.

   * - | ``processes``
       | ``.alias``
     - string
     - Optional
     - Hostname alias (often a |dns| CNAME) for the host on which the
       process runs. If an alias is specified, the {+mdbagent+} prefers
       this alias over the hostname specified in ``processes.hostname``
       when connecting to the host. You can also specify this alias in
       ``replicaSets.host`` and ``sharding.configServer``.

   * - | ``processes``
       | ``.authSchemaVersion``
     - integer
     - Required
     - Schema version of the user credentials for MongoDB database
       users. This should match all other elements of the ``processes``
       array that belong to the same cluster.

       - |mms| accepts ``3`` and ``5`` for this parameter.
       - MongoDB 3.x clusters default to ``5``.
       - MongoDB 2.6 clusters default to  ``3``.

       .. seealso::

          :manual:`Upgrade to SCRAM-SHA-1 </release-notes/3.0-scram/>`
          in the MongoDB 3.0 release notes.

   * - | ``processes``
       | ``.backupRestoreUrl``
     - string
     - Optional
     - Delivery |url| for the restore. |mms| sets this when creating a
       restore.

       .. seealso::

          :doc:`/tutorial/automate-backup-restoration-with-api`.

   * - | ``processes``
       | ``.cluster``
     - string
     - Conditional
     - Name of the sharded cluster. Set this value to the same value in
       the ``sharding.name`` parameter in the ``sharding`` array for
       the |mongos|.

       - *Required* for a |mongos|.
       - *Not needed* for a |mongod|.

   * - | ``processes``
       | ``.disabled``
     - Boolean
     - Optional
     - Flag that indicates if this process should be shut down. Set to
       ``true`` to shut down the process.

   * - | ``processes``
       | ``.featureCompatibilityVersion``
     - string
     - Required
     - Version of MongoDB with which this process has feature
       compatibility. Changing this value can enable MongoDB
       {+fcv-current+} features that aren't backwards compatible with
       MongoDB {+fcv-previous+}.

       - |mms| accepts ``{+fcv-previous+}`` and ``{+fcv-current+}`` as
         parameter values.
       - |mms| sets this parameter to ``{+fcv-current+}`` in new
         deployments of MongoDB {+fcv-current+}.
       - |mms| doesn't add this parameter set to ``{+fcv-current+}``
         when upgrading a host from {+fcv-previous+} to {+fcv-current+}.

       .. seealso::

          :manual:`setFeatureCompatibilityVersion </reference/command/setFeatureCompatibilityVersion/#dbcmd.setFeatureCompatibilityVersion>`

   * - | ``processes``
       | ``.hostname``
     - string
     - Required
     - Name of the host that serves this process. This defaults to
       ``localhost``.

   * - | ``processes``
       | ``.lastCompact``
     - string
     - Optional
     - |iso8601-time| when |mms| last reclaimed free space on a
       cluster's disks. During certain operations, MongoDB might move
       or delete data but does not free the now unused space. To
       reclaim this space, set this value to an |iso8601| timestamp.
       |mms| reclaims the disk space in a rolling fashion across
       members of the replica set or shards.

   * - | ``processes``
       | ``.logRotate``
     - object
     - Optional
     - MongoDB configuration object for rotating the MongoDB logs of a
       process.

   * - | ``processes``
       | ``.logRotate``
       | ``.numTotal``
     - integer
     - Optional
     - Total number of log files that |mms| retains. If you don't set
       this value, the total number of log files defaults to ``0``.
       |mms| bases rotation on your other ``processes.logRotate``
       settings.

   * - | ``processes``
       | ``.logRotate``
       | ``.numUncompressed``
     - integer
     - Optional
     - Maximum number of total log files to leave uncompressed,
       including the current log file. The default is ``5``.

   * - | ``processes``
       | ``.logRotate``
       | ``.percentOfDiskspace``
     - number
     - Optional
     - Maximum percentage of total disk space that |mms| can use to
       store the log files expressed as decimal. If this limit is
       exceeded, |mms| deletes compressed log files until it meets this
       limit. |mms| deletes the oldest log files first.

       The default is ``0.02``.

   * - | ``processes``
       | ``.logRotate``
       | ``.sizeThresholdMB``
     - number
     - Required
     - Maximum size in MB for an individual log file before |mms|
       rotates it. |mms| rotates the log file immediately if it meets
       the value given in either this ``sizeThresholdMB`` or the
       ``processes.logRotate.timeThresholdHrs`` limit.

   * - | ``processes``
       | ``.logRotate``
       | ``.timeThresholdHrs``
     - integer
     - Required
     - Maximum duration in hours for an individual log file before the
       next rotation. The time is since the last rotation.

       |mms| rotates the log file once the file meets either this
       ``timeThresholdHrs`` or the
       ``processes.logRotate.sizeThresholdMB`` limit.

   * - | ``processes``
       | ``.manualMode``
     - Boolean
     - Optional
     - Flag that indicates if {+mdbagent+} automates this process.

       - This defaults to ``false``.
       - Set to ``true`` to disable Automation on this process. The
         {+mdbagent+} takes no further actions on this process.
       - Set to ``false`` to enable Automation on this process. The
         {+mdbagent+} automates actions on this process.

   * - | ``processes``
       | ``.name``
     - string
     - Required
     - Unique name to identify the instance.

   * - | ``processes``
       | ``.numCores``
     - integer
     - Optional
     - Number of cores that |mms| should bind to this process. The
       {+mdbagent+} distributes processes across the cores as evenly as
       possible.

   * - | ``processes``
       | ``.processType``
     - string
     - Required
     - Type of MongoDB process being run. |mms| accepts |mongod| or
       |mongos| for this parameter.

   * - | ``processes``
       | ``.version``
     - string
     - Required
     - Name of the ``mongoDbVersions`` specification used with this
       instance.

