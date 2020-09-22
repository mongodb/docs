The **backupVersions** array specifies the version of the Backup Agent.
|mms| has made this parameter obsolete. To update the backup log
settings, use the :ref:`update-backup-logs` endpoint.

.. code-block:: json
   :linenos:

   "backupVersions[n]" : [
     {
      "name" : "<string>",
       "hostname" : "<string>",
       "urls" : {
        "<platform1>" : {
          "<build1>" : "<string>",
           ...,
           "default" : "<string>"
         },
         ...
       },
       "baseUrl" : "<string>",
       "logPath" : "<string>",
       "logRotate" : {
        "sizeThresholdMB" : "<number>",
         "timeThresholdHrs" : "<integer>",
         "numUncompressed": "<integer>",
         "percentOfDiskspace" : "<number>",
         "numTotal" : "<integer>"
       }
     },
     ...
   ]

.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - backupVersions[n]
     - array of objects
     - Optional
     - Objects that define version information for each
       Backup Agent.

   * - backupVersions[n].name
     - string
     - Required
     - Version of the Backup Agent.

       .. seealso:: :doc:`/reference/mongodb-compatibility`

       .. important::

          This property is read-only. Any modifications made to this
          property are not reflected when updating the Backup Agent
          through the |api|. To update the Backup Agent version, see
          :ref:`this endpoint <update-monitoring-backup-versions>`.

   * - backupVersions[n].hostname
     - string
     - Required
     - |fqdn| of the host that runs the Backup Agent. If the Backup
       Agent is not running on the host, |mms| installs the agent from
       the location specified in **backupVersions[n].urls**.

   * - backupVersions[n].urls
     - object
     - Required
     - Platform- and build-specific |url|\s from which to download the
       Backup Agent.

   * - backupVersions[n].urls.<platform>
     - object
     - Required
     - Label that identifies an operating system and its version. The
       field contains an object with key-value pairs, where each key is
       either the name of a build or **default** and each value is a
       |url| for downloading the Backup Agent. The object must include
       the **default** key set to the default download |url| for the
       platform.

   * - backupVersions[n].baseUrl
     - string
     - Required
     - Base |url| used for the **mothership** and **https** settings
       in the :doc:`/reference/backup-agent`. For example, for
       **"baseUrl"=https://cloud.mongodb.com**, the backup
       configuration fields would have these values:
       **mothership=api-backup.mongodb.com** and **https"=true**.

   * - backupVersions[n].logPath
     - string
     - Optional
     - Directory where the agent stores its logs. The default is to
       store logs in **/dev/null**.

   * - backupVersions[n].logRotate
     - object
     - Optional
     - Enables log rotation for the MongoDB logs for a process.

   * - backupVersions[n].logRotate.sizeThresholdMB
     - number
     - Required
     - Maximum size in MB for an individual log file before
       rotation.

   * - backupVersions[n].logRotate.timeThresholdHrs
     - integer
     - Required
     - Maximum time in hours for an individual log file before
       rotation.

   * - backupVersions[n].logRotate.numUncompressed
     - integer
     - Optional
     - Maximum number of total log files to leave uncompressed,
       including the current log file. The default is **5**.

   * - backupVersions[n].logRotate.percentOfDiskspace
     - number
     - Optional
     - Maximum percentage of total disk space all log files should
       take up before deletion. The default is **.02**.

   * - backupVersions[n].logRotate.numTotal
     - integer
     - Optional
     - If a number is not specified, the total number of log files
       defaults to **0** and is determined by other
       **backupVersion.logRotate** settings.
