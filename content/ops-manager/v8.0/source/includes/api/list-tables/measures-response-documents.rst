.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - databaseName
     - string
     - Database to which the measurement applies. 

       Populated for :doc:`Get Database Measurements </reference/api/measures/get-database-measurements>` only.

   * - end
     - string
     - |iso8601-time| for the end of the period the returned
       measurements cover.

   * - granularity
     - string
     - |iso8601-duration| that specifies the size of the interval that
       each data point covers.

       For example, ``PT5M`` specifies a 5-minute granularity.

   * - groupId
     - string
     - Unique identifier of the project that owns the host.

   * - hostId
     - string
     - Unique identifier of the host to which the measurements pertain.

   * - measurements
     - object array
     - Each object in this array represents a measurement and the data
       points for that measurement.

   * - measurements.dataPoints
     - object array
     - Each object represents a single data point. If there is no data
       point available for a particular moment in time, this ``value``
       is set to ``null``.

   * - measurements.dataPoints.timestamp
     - string
     - |iso8601-time| for the beginning of the time interval this data
       point represents.

   * - measurements.dataPoints.value
     - float
     - Value of this data point.

   * - measurements.name
     - string
     - Name of the measurement. Accepted values are given in the
       :doc:`/reference/api/measures/measurement-types` page.

   * - measurements.units
     - string
     - How this measurement is quantified. Accepted units are:

       - ``PERCENT``
       - ``MILLISECONDS``
       - ``BYTES``
       - ``GIGABYTES``
       - ``BYTES_PER_SECOND``
       - ``MEGABYTES_PER_SECOND``
       - ``GIGABYTES_PER_HOUR``
       - ``SCALAR_PER_SECOND``
       - ``SCALAR``

   * - partitionName
     - string
     - Name of the disk partition that stores the MongoDB process
       database.

       Populated for :doc:`Get Disk Partition Measurements </reference/api/measures/get-disk-measurements>` only.

   * - processId
     - string
     - |fqdn| and port of the MongoDB process.

   * - start
     - string
     - |iso8601-time| for the beginning of the period the returned
       measurements cover.
