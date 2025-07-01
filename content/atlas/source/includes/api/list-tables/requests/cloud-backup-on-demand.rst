.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 14 11 55

   * - Path Element
     - Type
     - Necessity
     - Description

   * - description
     - string
     - Required
     - Description of the on-demand snapshot.

   * - retentionInDays
     - number
     - Required
     - Number of days that |service| should retain the on-demand
       snapshot. Must be at least ``1`` .
