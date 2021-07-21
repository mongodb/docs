.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 14 66

   * - Name
     - Type
     - Description

   * - end
     - string
     - |iso8601-time| when to stop retrieving measurements.

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

   * - | measurements
       | .dataPoints
     - array
     - Value of and metadata provided for one data point. If |service|
       has no data point for a particular moment in time, the **value**
       field is set to **null**.

   * - | measurements
       | .dataPoints
       | .timestamp
     - string
     - |iso8601-time| when this time interval that this data point
       represents began.

   * - | measurements
       | .dataPoints
       | .value
     - number
     - Value this data point provides.

   * - | measurements
       | .name
     - string
     - Name of the measurement that this data point covers.

       The `Measurement Values <#measurement-values>`_ section details
       these metrics.

   * - | measurements
       | .units
     - string
     - Magnitude by which |service| quanitifies the measurement.

   * - processId
     - string
     - Hostname and port of the machine running the |service|
       MongoDB process.

   * - start
     - string
     - |iso8601-time| when to start retrieving measurements.
