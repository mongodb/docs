.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Parameter
     - Type
     - Necessity
     - Description

   * - logPath
     - string
     - Optional
     - Absolute file path to which this {+mdbagent+} writes its logs.
       If this is not specified, the log writes to standard error
       (``stderr``) on UNIX- and Linux-based systems and to the Event
       Log on Windows systems.

   * - logRotate
     - object
     - Optional
     - Thresholds after which this {+mdbagent+} rotates the backup log.

   * - | logRotate
       | .sizeThresholdMB
     - integer
     - Optional
     - Maximum size, in MB, of a log file before this {+mdbagent+}
       rotates the logs.

   * - | logRotate
       | .timeDurationHrs
     - integer
     - Optional
     - Number of hours after which this {+mdbagent+} rotates the log
       file.

   * - username
     - string
     - Optional
     - MongoDB user in the application database that manages the
       backup logs.

       If you use the |api| to enable authentication for the
       {+mdbagent+}, set this parameter to **mms-automation** when
       executing this endpoint.
