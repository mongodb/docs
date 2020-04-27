Output 
------ 

.. include:: /includes/command-output-intro.rst

.. admonition:: Free Tier
   :class: important

   ``M0`` Free Tier and ``M2/M5`` shared-tier clusters return a subset
   of the metrics documented here.

If you set the query element ``envelope`` to ``true``, the response is wrapped
by the ``content`` object.

The HTTP response returns a JSON document that includes the following objects:

.. list-table::
   :header-rows: 1
   :widths: 30 10 60

   * - Name
     - Type
     - Description

   * - ``end``
     - string
     - The end of the period for which to retrieve measurements, specified as
       an ISO-8601
       timestamp.

   * - ``granularity``
     - string
     - An ISO-8601-formatted
       time period that specifies the size of the interval covered by each
       data point. For example, ``PT5M`` specifies a 5-minute granularity.

   * - ``groupId``
     - string
     - ID of the project that owns the |service| MongoDB process.

   * - ``hostId``
     - string
     - The hostname of the machine running the |service| MongoDB process.

   * - ``links``
     - array
     - An array of documents, representing a :ref:`link <api-linking>` to one
       or more sub-resources and/or related resources such as :ref:`list
       pagination <api-lists>`. See :ref:`api-linking` for more information.

   * - ``measurements``
     - object array
     - An array of measurements and their data points.

   * - ``measurements.dataPoints``
     - object array
     - An array of objects, where each object represents a single data
       point. If there is no data point available for a particular moment in
       time (i.e., a timestamp), the ``value`` field is set to ``null``.

   * - ``measurements.dataPoints.timestamp``
     - string
     - The timestamp of the beginning of the time interval represented by this
       data point.

   * - ``measurements.dataPoints.value``
     - float
     - The value of the data point.

   * - ``measurements.name``
     - string
     - The name of the measurement.

   * - ``measurements.units``
     - string
     - How the measurement is quantified. Possible units are:

       - ``PERCENT``
       - ``MILLISECONDS``
       - ``BYTES``
       - ``GIGABYTES``
       - ``BYTES_PER_SECOND``
       - ``MEGABYTES_PER_SECOND``
       - ``GIGABYTES_PER_HOUR``
       - ``SCALAR_PER_SECOND``
       - ``SCALAR``

   * - ``partitionName``
     - string
     - Name of the disk or partition to which the measurements pertain.

   * -  ``processId``
     - string
     - The hostname and port of the machine running the |service| MongoDB
       process.

   * - ``start``
     - string
     - The start of the period for which to retrieve measurements, specified as
       an ISO-8601
       timestamp.
