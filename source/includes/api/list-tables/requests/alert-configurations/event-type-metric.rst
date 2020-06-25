.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - ``enabled``
     - boolean
     - Optional
     - Flag that indicates if this alert configuration is enabled or
       disabled.

   * - ``eventTypeName``
     - string
     - Required
     - Type of event that triggers an alert. Set this value to
       ``OUTSIDE_METRIC_THRESHOLD``. You must also set one or more host
       metrics in the ``metricThreshold`` array.
