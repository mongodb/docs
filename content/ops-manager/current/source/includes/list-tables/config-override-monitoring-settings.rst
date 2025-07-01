.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Parameter
     - Type
     - Necessity
     - Description

   * - configOverrides
     - object
     - Optional
     - List of {+mdbagent+} settings that you need to change because
       your monitoring settings differ from those of the
       :ref:`{+mdbagent+} <mongodb-agent-settings-main>`. Configure
       this option when upgrading from legacy agents to the
       {+mdbagent+}.

       .. include:: /includes/api/list-tables/auto-config/override-monitoring.rst

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
     - Thresholds after which this {+mdbagent+} rotates the monitoring
       log.

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
       monitoring logs.

       If you use the |api| to enable authentication for the
       {+mdbagent+}, set this parameter to **mms-automation** when
       executing this endpoint.
