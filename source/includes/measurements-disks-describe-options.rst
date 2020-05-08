.. list-table::
   :header-rows: 1
   :widths: 20 10 60 10

   * - Option
     - Type
     - Description
     - Required?

   * - ``<hostname>:<port>``
     - String
     - The hostname of the server running the MongoDB process
       and the port on which the process listens.
     - yes

   * - ``<partition-name>``
     - string
     - The name of the disk or partition for which to get available measurements.
     - yes

   * - ``granularity``
     - String
     - An ISO-8601-formatted time period that specifies the interval
       between measurement data points. For example, ``PT1M`` specifies
       1-minute granularity.
   
       The following subset of ISO-8601-formatted time periods are 
       supported:
   
       - ``PT1M``
       - ``PT5M``
       - ``PT1H``
       - ``P1D``
   
       When you specify ``granularity``, you must specify either ``period``
       *or* ``start`` and ``end``.
     - yes
   
   * - ``period``
     - String
     - An ISO-8601-formatted time period that specifies the length of time in
       the past to query. For example, to request the last 36 hours, specify:
       ``period=P1DT12H``. Mutually exclusive with ``start`` and ``end``.
     - yes
   
   * - ``start``
     - String
     - The time at which to start retrieving measurements, as specified by an
       ISO-8601 timestamp string. If you specify ``start``, you must also
       specify ``end``. Mutually exclusive with ``period``.
     - yes
   
   * - ``end``
     - String
     - The time at which to stop retrieving measurements, as specified by an
       ISO-8601 timestamp string. If you specify ``end``, you must also
       specify ``start``. Mutually exclusive with ``period``.
     - yes
   
   * - ``type``
     - String
     - Specifies which measurement to return. If ``type`` is not specified, all
       measurements are returned.
   
       You must specify a measurement that is valid for the host. |service|
       returns an error if a specified measurement is invalid.
   
       The following measurement values are valid:
   
       .. list-table::
   
          * - - ``DISK_PARTITION_IOPS_READ``
              - ``DISK_PARTITION_IOPS_WRITE``
              - ``DISK_PARTITION_IOPS_TOTAL``
          
            - Measures throughput of I/O operations for the disk partition used for
              MongoDB.
          
          * - - ``DISK_PARTITION_UTILIZATION``
          
            - The percentage of time during which requests are being issued to and
              serviced by the partition. This includes requests from any process, not
              just MongoDB processes.
          
          * - - ``DISK_PARTITION_LATENCY_READ``
              - ``DISK_PARTITION_LATENCY_WRITE``
          
            - Measures latency, per operation type, of the disk partition used by
              MongoDB.
          
          * - - ``DISK_PARTITION_SPACE_FREE``
              - ``DISK_PARTITION_SPACE_USED``
              - ``DISK_PARTITION_SPACE_PERCENT_FREE``
              - ``DISK_PARTITION_SPACE_PERCENT_USED``
          
            - Measures the free disk space and used disk space on the disk partition
              used by MongoDB.
     - no

   * - ``--profile``, ``-P``
     - string
     - Name of the profile where the project ID and the |svc-api-key|\s 
       for the project are saved. If omitted, uses the ``default`` profile. 
       To learn more about creating a profile, see :ref:`mcli-configure`.
     - no

   * - ``--projectId``
     - string
     - Unique identifier of the project for which to retrieve events. If
       omitted, uses the project ID listed in the profile.
     - no
