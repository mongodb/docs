.. list-table::
   :widths: 20 14 11 55
   :stub-columns: 1


   * - | threshold
       | .operator
     - string
     - Required
     - Comparison operator to apply when checking the current condition
       against the **threshold.threshold** value. |service| accepts the
       following values:

       - ``GREATER_THAN``
       - ``LESS_THAN``

   * - | threshold
       | .threshold
     - integer
     - Required
     - Value that, when exceeded, |service| triggers an alert.

   * - threshold.units
     - string
     - Required
     - Units of capacity or time that define the scope of the
       **threshold.threshold**.
