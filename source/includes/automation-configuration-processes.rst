The ``processes`` array determines the configuration of your MongoDB instances.
You can also use the array to restore an instance.

.. code-block:: cfg

   "processes" : [
       {
           "name" : <string>,
           "processType" : <string>,
           "version" : <string>,
           "<args>" : <object>,
           "disabled" : <Boolean>,
           "manualMode" : <Boolean>,
           "hostname" : <string>,
           "authSchemaVersion" : <integer>,
           "featureCompatibilityVersion" : <string>,
           "cluster": <string>,
           "numCores": <integer>,
           "logRotate" : {
               "sizeThresholdMB" : <number>,
               "timeThresholdHrs" : <integer>,
               "numUncompressed": <integer>,
               "percentOfDiskspace" : <number>
           },
           "alias": <string>,
           "backupRestoreUrl" : <string>
       },
       ...
   ]

.. list-table::
   :widths: 30 10 80
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``processes``
     - array of objects
     - The ``processes`` array contains objects that define the
       :program:`mongos` and :program:`mongod` instances that |mms|
       monitors. Each object defines a different instance.

   * - ``processes.name``
     - string
     - A unique name to identify the instance.

   * - ``processes.processType``
     - string
     - Either ``mongod`` or ``mongos``.

   * - ``processes.version``
     - string
     - The name of the ``mongoDbVersions`` specification used with
       this instance.

   * - ``processes.args2_6``
     - object
     - The MongoDB configuration object for MongoDB versions 2.6 and
       higher. 
       For information on format and supported MongoDB options, see
       :doc:`supported configuration options
       </reference/cluster-configuration-process-options>`.

   * - ``processes.disabled``
     - Boolean
     - *Optional*. Set to ``true`` to shut down the process.

   * - ``processes.manualMode``
     - Boolean
     - *Optional*. Set to ``true`` to operate this process in manual mode.
       The Automation Agent will take no actions on the process.

   * - ``processes.hostname``
     - string
     - The name of the host this process should run on. This defaults to
       ``localhost``.
       
   * - ``processes.authSchemaVersion``
     - integer
     - The schema version of the user credentials for MongoDB database
       users. This should match all other elements of the ``processes``
       array that belong to the same cluster. The possible values are 
       ``1``, ``3``, and ``5``. The default is ``5`` for MongodDB 3.x
       clusters and ``1`` for MongoDB 2.4 clusters. See `Upgrade to
       SCRAM-SHA-1 <https://docs.mongodb.com/manual/release-notes/3.0-scram/>`_
       in the MongoDB 3.0 release notes for more information.

   * - ``processes.featureCompatibilityVersion``
     - string
     - Enables MongoDB 3.4 features that are not backwards compatible with
       MongDB 3.2. Valid values are "3.2" and "3.4". New deployments of MongoDB 3.4 automatically set
       the value of this field to "3.4". However, upgrading a host from
       3.2 to 3.4 does not automatically add the field with a value of
       3.4. See the
       `setFeatureCompatibilityVersion <https://docs.mongodb.com/manual/reference/command/setFeatureCompatibilityVersion/#dbcmd.setFeatureCompatibilityVersion>`_
       reference for more information about behavior and affected features.

   * - ``processes.cluster``
     - string
     - *Optional*. Required for a :program:`mongos`. The name of the
       cluster. This must correspond to the ``sharding.name`` field
       in the ``sharding`` array for the :program:`mongos`.

   * - ``processes.numCores``
     - integer
     - *Optional*. The number of cores the process should be bound to. The
       Automation Agent will spread processes out across the cores as
       evenly as possible.

   * - ``processes.logRotate``
     - object
     - *Optional*. Enables log rotation for the MongoDB logs for a
       process.

   * - ``processes.logRotate.sizeThresholdMB``
     - number
     - The maximum size in MB for an individual log file before
       rotation. The file rotates immediately if the file meets either
       this ``sizeThresholdMB`` or the
       ``processes.logRotate.timeThresholdHrs`` limit.

   * - ``processes.logRotate.timeThresholdHrs``
     - integer
     - The maximum time in hours for an individual log file before the
       next rotation. The time is since the last rotation.

       The log file rotates immediately if the file meets either this
       ``timeThresholdHrs`` or the
       ``processes.logRotate.sizeThresholdMB`` limit.

   * - ``processes.logRotate.numUncompressed``
     - integer
     - *Optional*. The maximum number of total log files to leave
       uncompressed, including the current log file. The default is ``5``.

   * - ``processes.logRotate.percentOfDiskspace``
     - number
     - *Optional*. The maximum percentage of total disk space that can
       be used to store the log files. If this limit is exceeded, the
       compressed log files are deleted to meet this limit, starting
       with the oldest log files first.

       The default is ``.02``.

   * - ``processes.alias``
     - string
     - *Optional*. A hostname alias (often a DNS CNAME) for the server on
       which the process runs. If an alias is specified, the Automation
       Agent prefers the alias over the host specified in
       ``processes.hostname`` when connecting to the server. You can
       also specify this alias in ``replicaSets.host`` and
       ``sharding.configServer``.

   * - ``processes.backupRestoreUrl``
     - string
     - *Optional*. This is used only when creating a restore and specifies the
       delivery url for the restore. See
       :doc:`/tutorial/automate-backup-restoration-with-api`.
