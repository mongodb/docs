.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - Input Type
     - Behavior

   * - binData
     - Returns an array of numeric values.

       The numeric type of the array elements depends on the binData
       format.

   * - String
     - Returns an array corresponding to the content within the string.

       The string must contain characters that represent a valid
       :term:`JSON` array.

   * - Null or Missing
     - Returns null.

