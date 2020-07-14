.. list-table::
   :header-rows: 1
   :widths: 30 10 60

   * - Name
     - Type
     - Description

   * - ``end``
     - string
     - The end of the period for which to retrieve metrics, specified as
       an ISO-8601
       timestamp.

   * - ``granularity``
     - string
     - An ISO-8601-formatted
       time period that specifies the size of the interval covered by each
       data point. For example, ``PT5M`` specifies a 5-minute granularity.

   * - ``groupId``
     - string
     - The ID of the project that owns the MongoDB process.

   * - ``hostId``
     - string
     - The hostname of the machine running the MongoDB process.

   * - ``links``
     - array
     - An array of documents, representing a :ref:`link <api-linking>` to one
       or more sub-resources and/or related resources such as :ref:`list
       pagination <api-lists>`. See :ref:`api-linking` for more information.

   * - ``measurements``
     - object array
     - An array of metrics and their data points.

   * - ``measurements.name``
     - string
     - The name of the metric.

   * - ``measurements.units``
     - string
     - How the metric is quantified. Possible units are:

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
     - Name of the disk or partition to which the metrics pertain.

   * -  ``processId``
     - string
     - The hostname and port of the machine running the MongoDB
       process.

   * - ``start``
     - string
     - The start of the period for which to retrieve metrics, specified as
       an ISO-8601
       timestamp.
