.. list-table::
   :widths: 20 14 11 55
   :stub-columns: 1

   * - | metricThreshold
       | .metricName
     - string
     - Required
     - Name of the metric to check.

       To review available metrics, see :ref:`measurement-types`.

   * - | metricThreshold
       | .operator
     - string
     - Required
     - Comparison operator to apply when checking the current metric
       value against the threshold value. |service| accepts the
       following values:

       - ``GREATER_THAN``
       - ``LESS_THAN``

   * - | metricThreshold
       | .threshold
     - integer
     - Required
     - Value of **metricThreshold.metricName** that, when exceeded,
       |service| triggers an alert.

   * - | metricThreshold
       | .units
     - string
     - Required
     - Units of capacity or time that define the scope of the
       **metricThreshold.threshold**. Depends on the type of metric.

       .. example::

          A metric that measures memory consumption would have a byte
          measurement, while a metric that measures time would have a
          time unit.

       |service| accepts the following values for durations:

       .. include:: /includes/api/list-tables/units/times-within-days.rst

       |service| accepts the following values for storage or memory:

       .. include:: /includes/api/list-tables/units/storage-units.rst

   * - | metricThreshold
       | .mode
     - string
     - Required
     - This must be set to ``AVERAGE``. |service| computes the current
       metric value as an average.
