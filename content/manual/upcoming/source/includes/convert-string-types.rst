The following table lists the input types that can be converted to a
string:

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - Input Type
     - Behavior

   * - Array
     - Returns the :bsontype:`Array` as a string.

       .. versionadded:: 8.3

   * - BinData
     - If the :bsontype:`BinData <Binary>` is a UUID, returns the UUID as a
       string. Otherwise, returns the base64 encoded string value. 
   
   * - Boolean
     - Returns the Boolean value as a string.

   * - Date
     - Returns the :bsontype:`Date` as a string.
 
   * - Decimal
     - Returns the :bsontype:`Decimal <Decimal128>` value as a string.
  
   * - Double
     - Returns the :bsontype:`Double` value as a string.

   * - Integer
     - Returns the :bsontype:`Integer <Int32>` value as a string.

   * - Long
     - Returns the :bsontype:`Long <Int64>` value as a string.

   * - MaxKey
     - Returns the :bsontype:`MaxKey` as a string.

       .. versionadded:: 8.3

   * - MinKey
     - Returns the :bsontype:`MinKey` as a string.

       .. versionadded:: 8.3

   * - Object
     - Returns the object as a string.

       .. versionadded:: 8.3

   * - ObjectId
     - Returns the :bsontype:`ObjectId` value as a hexadecimal string.

   * - Regular Expression
     - Returns the :bsontype:`Regular Expression` as a string.

       .. versionadded:: 8.3

   * - String
     - No operation. Returns the string value.

   * - Timestamp
     - Returns the :bsontype:`Timestamp` as a string.

       .. versionadded:: 8.3
