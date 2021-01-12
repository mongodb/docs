.. list-table::
   :header-rows: 1
   :widths: 30 10 60

   * - Name
     - Type
     - Description

   * - end
     - string
     - |iso8601-time| when to stop retrieving measurements.

       If you specify ``end`` you must also specify ``start``. Mutually
       exclusive with ``period``.

   * - granularity
     - string
     - |iso8601-duration| that specifies the interval between
       measurement data points.

       .. example::

          ``PT1M`` specifies 1-minute granularity.

       |service| supports the following subset of |iso-8601|\-formatted
       time periods:

       - ``PT1M``
       - ``PT5M``
       - ``PT1H``
       - ``P1D``

       When you specify ``granularity``, you must specify either
       ``period`` *or* ``start`` and ``end``.

   * - groupId
     - string
     - Unique 24-hexadecimal digit string that identifies the project
       that owns the |service| MongoDB process.

   * - hostId
     - string
     - Unique 24-hexadecimal digit string that identifies the machine
       running the |service| MongoDB process.

   * - links
     - array
     - .. include:: /includes/api/links-explanation.rst

   * - measurements
     - array
     - List of measurements and their data points.

   * - measurements.dataPoints
     - array
     - Value of and metadata provided for one data point. If |service|
       has no data point for a particular moment in time, the ``value``
       field is set to ``null``.

   * - measurements.dataPoints.timestamp
     - string
     - |iso8601-time| when this time interval that this data point
       represents began.

   * - measurements.dataPoints.value
     - float
     - Value this data point provides.

   * - measurements.name
     - string
     - Name of the measurement that this data point covers.

       This page lists :ref:`possible values <measurement-types>`.

   * - measurements.units
     - string
     - Magnitude by which |service| quanitifies the measurement.
       |service| uses units of throughput, storage, and time that
       include:

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
     - Name of the disk or partition to which the measurements apply.

   * - processId
     - string
     - Hostname and port of the machine running the |service|
       MongoDB process.

   * - start
     - string
     - |iso8601-time| when to start retrieving measurements. If you
       specify ``start`` you must also specify ``end``. Mutually
       exclusive with ``period``.
