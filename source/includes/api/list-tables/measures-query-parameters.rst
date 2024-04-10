.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1
   
   * - Name
     - Type
     - Description

   * - | granularity
       | *Required*
     - string
     - |iso8601-duration| that specifies the interval between
       measurement data points.

       Measurement granularity can be expressed as days, hours, minutes, seconds and milliseconds using the following notation:

       ``P`` (for *period*) followed by:

       - ``D`` for *days* (if desired)
       - ``T`` for *time* (after *days*)
       - ``H`` for *hours*
       - ``M`` for *minutes*
       - ``S`` for *seconds*

       .. example::

          .. list-table::
             :widths: 20 80
             :header-rows: 1
             
             * - Notation
               - Duration

             * - ``PT30S``
               - 30 seconds
             * - ``P1T12H``
               - 1 day, 12 hours
             * - ``PT0.5S``
               - 500 milliseconds

   * - period
     - string
     - |iso8601-duration| that specifies how far back in the past to
       retrieve measurements.

       .. example:: 

          To request the last 36 hours, include this query parameter:
          ``period=P1DT12H``.

   * - start
     - string
     - |iso8601-time| for the beginning of the period for which to
       retrieve measurements. If you specify ``start`` you must also
       specify ``end`` and you can't specify ``period``.

   * - end
     - string
     - |iso8601-time| for the end of the period for which to retrieve
       measurements. If you specify ``end`` you must also specify
       ``start`` and you can't specify ``period``.

   * - m
     - string
     - Measurements to return. If ``m`` is not specified, all
       measurements are returned.

       To specify multiple values for ``m``, you must repeat the ``m``
       parameter.

       .. example::

          .. code-block:: none

             ../measurements?m=CONNECTIONS&m=OPCOUNTER_CMD&m=OPCOUNTER_QUERY

       You must specify measurements that are valid for the host. |mms|
       returns an error if any specified measurements are invalid
       For available measurements, see :doc:`/reference/api/measures/measurement-types`.
