.. list-table::
   :header-rows: 1
   :widths: 55 50

   * - Input Type
     - Behavior

   * - Array
     - Returns true
   
   * - Binary data
     -  Returns true
   
   * - Boolean
     -  No-op. Returns the boolean value.

   * - Code
     - Returns true

   * - Date
     - Returns true
   
   * - Decimal
     - | Returns true if not zero
       | Return false if zero
   
   * - Double
     - | Returns true if not zero
       | Return false if zero

   * - Integer
     - | Returns true if not zero
       | Return false if zero

   * - JavaScript
     - Returns true

   * - Long
     - | Returns true if not zero
       | Return false if zero

   * - MaxKey
     - Returns true
   
   * - MinKey
     - Returns true

   * - Null
     - |null-description|

   * - Object
     - Returns true
   
   * - ObjectId
     - Returns true

   * - Regular expression
     - Returns true
   
   * - String
     - Returns true

   * - Timestamp
     - Returns true

To learn more about data types in MongoDB, see :ref:`bson-types`.
