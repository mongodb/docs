.. list-table::
   :widths: 20 14 11 55
   :stub-columns: 1

   * - | ``metricThreshold``
       | ``.metricName``
     - string
     - Conditional
     - Name of the metric to check.

       See :ref:`measurement-types` for the available metrics.

   * - | ``metricThreshold``
       | ``.operator``
     - string
     - Conditional
     - Operator to apply when checking the current metric value against
       the threshold value. |service| accepts the following values:

       - ``GREATER_THAN``
       - ``LESS_THAN``

   * - | ``metricThreshold``
       | ``.threshold``
     - integer
     - Conditional
     - Value of ``metricThreshold.metricName`` outside of which an
       alert will be triggered.

   * - | ``metricThreshold``
       | ``.units``
     - string
     - Conditional
     - Units for the value of ``metricThreshold.threshold``. Depends on
       the type of metric.

       .. example::

          A metric that measures memory consumption would have a byte
          measurement, while a metric that measures time would have a
          time unit.

       Accepted values for durations are:

       .. include:: /includes/api/list-tables/units/times-within-days.rst

       Accepted values for storage or memory are:

       .. include:: /includes/api/list-tables/units/storage-units.rst

   * - | ``metricThreshold``
       | ``.mode``
     - string
     - Conditional
     - This must be set to ``AVERAGE``. |service| computes the current
       metric value as an average.
