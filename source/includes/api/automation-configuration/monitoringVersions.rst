The **monitoringVersions** array specifies the version of the
Monitoring Agent. |mms| has made this parameter obsolete. To update the
monitoring log settings, use the :ref:`update-monitoring-logs`
endpoint.

.. code-block:: json
   :linenos:

   "monitoringVersions" : [
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
         "sizeThresholdMB" : <number>,
         "timeThresholdHrs" : <integer>,
         "numUncompressed": <integer>,
         "percentOfDiskspace" : <number>,
         "numTotal" : <integer>
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

   * - monitoringVersions
     - array of objects
     - Optional
     - Objects that define version information for each Monitoring
       Agent.

   * - monitoringVersions.name
     - string
     - Required
     - Version of the Monitoring Agent.

       .. seealso:: :doc:`/reference/mongodb-compatibility`

       .. important::

          This property is read-only. Any modifications made to this
          property are not reflected when updating the Monitoring Agent
          through the |api|.

          To update the Monitoring Agent version, use :ref:`this endpoint <update-monitoring-backup-versions>`.

   * - monitoringVersions.hostname
     - string
     - Required
     - |fqdn| of the host that runs the Monitoring Agent. If the
       Monitoring Agent is not running on the host, |mms| installs the
       agent from the location specified in
       **monitoringVersions.urls**.

   * - monitoringVersions.urls
     - object
     - Required
     - Platform- and build-specific |url|\s from which to download
       the Monitoring Agent.

   * - monitoringVersions.urls.<platform>
     - object
     - Required
     - Label that identifies an operating system and its version. The
       field contains an object with key-value pairs, where each key is
       either the name of a build or **default** and each value is a
       |url| for downloading the Monitoring Agent. The object must
       include the **default** key set to the default download |url|
       for the platform.

   * - monitoringVersions.baseUrl
     - string
     - Required
     - Base |url| used for the :setting:`mmsBaseUrl` setting.

   * - monitoringVersions.logPath
     - string
     - Optional
     - Directory where the agent stores its logs. The
       default is to store logs in **/dev/null**.

   * - monitoringVersions.logRotate
     - object
     - Optional
     - Enables log rotation for the MongoDB logs for a
       process.

   * - monitoringVersions.logRotate.sizeThresholdMB
     - number
     - Required
     - Maximum size in MB for an individual log file before rotation.

   * - monitoringVersions.logRotate.timeThresholdHrs
     - integer
     - Required
     - Maximum time in hours for an individual log file before
       rotation.

   * - monitoringVersions.logRotate.numUncompressed
     - integer
     - Optional
     - Maximum number of total log files to leave uncompressed,
       including the current log file. The default is **5**. In earlier
       versions of |mms|, this field was named **maxUncompressed**. The
       earlier name is still recognized, though the new version is
       preferred.

   * - monitoringVersions.logRotate.percentOfDiskspace
     - number
     - Optional
     - Maximum percentage of total disk space all log
       files should take up before deletion. The default is **.02**.

   * - monitoringVersions.logRotate.numTotal
     - integer
     - Optional
     - Total number of log files. If a number is not
       specified, the total number of log files defaults to **0** and
       is determined by other **monitoringVersions.logRotate**
       settings.
