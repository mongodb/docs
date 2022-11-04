When writing to Parquet, {+adf+} uses the :manual:`MongoDB BSON types
</reference/bson-types/>` to `Parquet types 
<https://parquet.apache.org/docs/file-format/types/>`__ mapping in the
following table, including the following: 

- *Parquet Data type:* Primitive types supported by Parquet which are
  intended to be as minimal as possible for efficiency. 
- *Parquet Converted Type:* An older representation of the logical type
  annotations used to extend primitive types. 
- *Parquet Logical Type:* Used to extend the types that Parquet can
  store by specifying how the primitive types should be interpreted. 

.. list-table:: 
   :header-rows: 1
   :widths: 25 25 25 25

   * - MongoDB |bson| Data Type
     - Parquet Data Type
     - Parquet Converted Type
     - Parquet Logical Type

   * - Double
     - DOUBLE
     - None
     - None

   * - String
     - BYTE_ARRAY
     - UTF8
     - STRING

   * - Object
     - None
     - None
     - None

   * - Array
     - None
     - LIST
     - LIST

   * - BinData
     - BYTE_ARRAY
     - None
     - None

   * - Undefined
     - None
     - None
     - None

   * - ObjectID
     - BYTE_ARRAY
     - UTF8
     - STRING

   * - Boolean
     - BOOLEAN
     - None
     - None

   * - Date
     - INT64
     - TIMESTAMP_MILLIS
     - TIMESTAMP, ``isAdjustedToUTC`` = ``true``, unit = MILLIS

   * - Null
     - None
     - None
     - None

   * - Regex
     - BYTE_ARRAY
     - UTF8
     - STRING

   * - DBPointer
     - BYTE_ARRAY
     - UTF8
     - STRING

   * - JSCode
     - BYTE_ARRAY
     - UTF8
     - STRING

   * - Symbol
     - BYTE_ARRAY
     - UTF8
     - STRING

   * - JSCodeWScope
     - BYTE_ARRAY
     - UTF8
     - STRING

   * - Int
     - INT32
     - None
     - None

   * - Timestamp
     - INT64
     - None
     - None

   * - Long
     - INT64
     - None
     - None

   * - Decimal
     - BYTE_ARRAY
     - UTF8
     - STRING

   * - MinKey
     - BYTE_ARRAY
     - UTF8
     - STRING

   * - MaxKey
     - BYTE_ARRAY
     - UTF8
     - STRING
