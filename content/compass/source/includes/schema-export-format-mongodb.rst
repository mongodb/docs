MongoDB format schema objects contain the following fields:

.. list-table::
   :header-rows: 1
   :widths: 35 25 40
 
   * - Property
     - Data type
     - Description

   * - ``bsonType``
     - string or array of strings
     - |bson| type of this field.

   * - ``required``
     - array of strings
     - Fields that must appear in the schema. 

   * - ``properties``
     - document
     - Properties for each field. Keys are property names and values are
       subschemas. 

   * - ``items``
     - document
     - Metadata about elements in array fields. Metadata appears as
       embedded subschemas. 
