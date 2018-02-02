The ``backupVersions`` array is optional and specifies the version of the Backup Agent.

.. code-block:: cfg

   "backupVersions" : [
       {
           "name" : <string>,
           "hostname" : <string>,
           "urls" : {
               <platform1> : {
                   <build1> : <string>,
                   ...,
                   "default" : <string>
               },
               ...
           },
           "baseUrl" : <string>,
           "logPath" : <string>,
           "logRotate" : {
               "sizeThresholdMB" : <number>,
               "timeThresholdHrs" : <integer>,
               "numUncompressed": <integer>,
               "percentOfDiskspace" : <number>
           }
       },
       ...
   ]

.. list-table::
   :widths: 30 10 80
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - backupVersions
     - object array
     - *Optional*. Objects that define version information for each
       Backup Agent.

   * - backupVersions.name
     - string
     - The desired version of the Backup Agent (e.g. "3.1.1.263-1").

   * - backupVersions.hostname
     - string
     - The hostname of the machine that runs the Backup Agent. If the
       Backup Agent is not running on the machine, |mms| installs the
       agent from the location specified in ``backupVersions.urls``.

   * - backupVersions.urls
     - object
     - The platform- and build-specific URLs from which to download the
       Backup Agent.

   * - ``backupVersions.urls.<platform>``
     - object
     - This field has a name that identifies an operating system and
       optionally a version. The field contains an object with key-value
       pairs, where each key is either the name of a build or ``default``
       and each value is a URL for downloading the Backup Agent. The
       object must include the ``default`` key set to the default
       download URL for the platform.

   * - backupVersions.baseUrl
     - string
     - The base URL used for the ``mothership`` and ``https`` settings in
       the :doc:`/reference/backup-agent`. For example, for
       ``"baseUrl"=https://cloud.mongodb.com``, the backup configuration
       fields would have these values:
       ``mothership=api-backup.mongodb.com`` and ``https"=true``.

   * - backupVersions.logPath
     - string
     - *Optional*. The directory where the agent stores its logs. The
       default is to store logs in ``/dev/null``. To update, see the
       :ref:`backupAgentConfig <update-monitoring-or-backup-agent-via-api>`
       endpoint.

   * - backupVersions.logRotate
     - object
     - *Optional*. Enables log rotation for the MongoDB logs for a
       process. To update, see the :ref:`backupAgentConfig
       <update-monitoring-or-backup-agent-via-api>` endpoint.

   * - backupVersions.logRotate.sizeThresholdMB
     - number
     - The maximum size in MB for an individual log file before rotation.
       To update, see the :ref:`backupAgentConfig
       <update-monitoring-or-backup-agent-via-api>` endpoint.

   * - backupVersions.logRotate.timeThresholdHrs
     - integer
     - The maximum time in hours for an individual log file before
       rotation. To update, see the :ref:`backupAgentConfig
       <update-monitoring-or-backup-agent-via-api>` endpoint.

   * - backupVersions.logRotate.numUncompressed
     - integer
     - *Optional*. The maximum number of total log files to leave
       uncompressed, including the current log file. The default is ``5``.
       To update, see the :ref:`backupAgentConfig
       <update-monitoring-or-backup-agent-via-api>` endpoint.

   * - backupVersions.logRotate.percentOfDiskspace
     - number
     - *Optional*. The maximum percentage of total disk space all log
       files should take up before deletion. The default is ``.02``.
       To update, see the :ref:`backupAgentConfig
       <update-monitoring-or-backup-agent-via-api>` endpoint.
