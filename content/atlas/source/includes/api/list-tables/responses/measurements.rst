.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 14 66

   * - Name
     - Type
     - Description

   * - end
     - string
     - Date and time that specifies when to stop retrieving
       measurements. If you set" **end**, you must set **start**. You
       can't set this parameter and" **period** in the same request.
       This parameter expresses its value in the :rfc:`RFC 3339
       <3339#section-5.6>` timestamp format in UTC.

   * - granularity
     - string
     - |iso8601-duration| that specifies the interval between
       measurement data points.

   * - groupId
     - string
     - Unique 24-hexadecimal digit string that identifies the project
       that owns the |service| MongoDB process.

   * - hostId
     - string
     - Hostname and port of the host running the |service| MongoDB
       process.

   * - links
     - array
     - .. include:: /includes/api/links-explanation.rst

   * - measurements
     - array
     - List of measurements recorded and their data points.

   * - measurements.dataPoints
     - array
     - Value of and metadata provided for one data point. If |service|
       has no data point for a particular moment in time, the **value**
       field is set to **null**.

   * - measurements.dataPoints.timestamp
     - string
     - |iso8601-time| when this time interval that this data point
       represents began.

   * - measurements.dataPoints.value
     - number
     - Value this data point provides.

   * - measurements.name
     - string
     - Name of the measurement that this data point covers.

       The `Measurement Values <#measurement-values>`_ section details
       these metrics.

   * - measurements.units
     - string
     - Magnitude by which |service| quanitifies the measurement.

   * - processId
     - string
     - Hostname and port of the machine running the |service|
       MongoDB process.

   * - start
     - string
     - Date and time that specifies when to start retrieving
       measurements. If you set **start**, you must set **end**. You
       can't set this parameter and **period** in the same request.
       This parameter expresses its value in the :rfc:`RFC 3339
       <3339#section-5.6>` timestamp format in UTC.
