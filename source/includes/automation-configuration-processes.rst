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
           "cluster": <string>,
           "numCores": <integer>,
           "logRotate" : {
               "sizeThresholdMB" : <number>,
               "timeThresholdHrs" : <integer>,
               "numUncompressed": <integer>,
               "percentOfDiskspace" : <number>
           },
           "authSchemaVersion": <integer>,
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

   * - ``processes.<args>``
     - object
     - This field is named ``args2_6`` for MongoDB versions 2.6 and
       higher (including 3.0 and higher). The field contains a MongoDB
       configuration object in the format appropriate to the version.
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
     - *Optional*. The name of the host this process should run on. This
       defaults to ``localhost``.

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

   * - ``processes.authSchemaVersion``
     - integer
     - *Optional*. The schema version of the user credential objects.
       This should match all other elements of the ``processes`` array
       that belong to the same cluster. The possible values are ``1``,
       ``3``, and ``5``. The default is ``3`` for ``2.6`` clusters and
       ``1`` for ``2.4`` clusters.

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
