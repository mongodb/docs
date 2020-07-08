The ``monitoringVersions`` array is optional and specifies the version
of the :doc:`{+magent+} </tutorial/nav/monitoring-agent/>`.

.. code-block:: cfg

   "monitoringVersions" : [
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
               "percentOfDiskspace" : <number>,
               "numTotal" : <integer>
           }
       },
       ...
   ]

.. list-table::
   :widths: 30 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``monitoringVersions``
     - object array
     - *Optional*. Objects that define version information for each
       :doc:`{+magent+} </tutorial/nav/monitoring-agent/>`.

   * - | ``monitoringVersions``
       | ``.name``
     - string
     - Version of the {+magent+} (e.g. "2.9.1.176-1").

       For MongoDB compatibility with Automation, see
       :doc:`/reference/mongodb-compatibility`.

       .. important::

          This property is read-only. Any modifications made to this
          property are not reflected when updating the
          {+magent+} through the |api|. To update the Monitoring Agent version, see :ref:`this endpoint
          <update-monitoring-backup-versions>`.

   * - | ``monitoringVersions``
       | ``.hostname``
     - string
     - The hostname of the machine that runs the {+magent+}. If the
       {+magent+} is not running on the machine, |mms| installs the
       agent from the location specified in ``monitoringVersions.urls``.

   * - | ``monitoringVersions``
       | ``.urls``
     - object
     - The platform- and build-specific URLs from which to download the
       {+magent+}.

   * - | ``monitoringVersions``
       | ``.urls``
       | ``.<platform>``
     - object
     - This field has a name that identifies an operating system and
       optionally a version. The field contains an object with key-value
       pairs, where each key is either the name of a build or ``default``
       and each value is a URL for downloading the {+magent+}. The
       object must include the ``default`` key set to the default
       download URL for the platform.

   * - | ``monitoringVersions``
       | ``.baseUrl``
     - string
     - The base URL used for the ``mmsBaseUrl`` setting in the
       :doc:`/reference/monitoring-agent`.

   * - | ``monitoringVersions``
       | ``.logPath``
     - string
     - *Optional*. The directory where the agent stores its logs. The
       default is to store logs in ``/dev/null``. To update, see the
       :ref:`monitoringAgentConfig
       <update-monitoring-or-backup-agent-via-api>` endpoint.

   * - | ``monitoringVersions``
       | ``.logRotate``
     - object
     - *Optional*. Enables log rotation for the MongoDB logs for a
       process. To update, see the :ref:`monitoringAgentConfig
       <update-monitoring-or-backup-agent-via-api>` endpoint.

   * - | ``monitoringVersions``
       | ``.logRotate``
       | ``.sizeThresholdMB``
     - number
     - The maximum size in MB for an individual log file before rotation.
       To update, see the :ref:`monitoringAgentConfig
       <update-monitoring-or-backup-agent-via-api>` endpoint.

   * - | ``monitoringVersions``
       | ``.logRotate``
       | ``.timeThresholdHrs``
     - integer
     - The maximum time in hours for an individual log file before
       rotation. To update, see the :ref:`monitoringAgentConfig
       <update-monitoring-or-backup-agent-via-api>` endpoint.

   * - | ``monitoringVersions``
       | ``.logRotate``
       | ``.numUncompressed``
     - integer
     - *Optional*. The maximum number of total log files to leave
       uncompressed, including the current log file. The default is ``5``.
       In earlier versions of |mms|, this field was named
       ``maxUncompressed``. The earlier name is still recognized, though
       the new version is preferred. To update, see the
       :ref:`monitoringAgentConfig
       <update-monitoring-or-backup-agent-via-api>` endpoint.

   * - | ``monitoringVersions``
       | ``.logRotate``
       | ``.percentOfDiskspace``
     - number
     - *Optional*. The maximum percentage of total disk space all log
       files should take up before deletion. The default is ``.02``.
       To update, see the :ref:`monitoringAgentConfig
       <update-monitoring-or-backup-agent-via-api>` endpoint.

   * - | ``monitoringVersions``
       | ``.logRotate``
       | ``.numTotal``
     - integer
     - *Optional*. The total number of log files. If a number is not specified, the total 
       number of log files defaults to ``0`` and is determined by other
       ``monitoringVersions.logRotate`` settings.
