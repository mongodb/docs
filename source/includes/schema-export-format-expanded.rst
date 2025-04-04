Expanded format schema objects contain these fields in addition to the 
Standard Schema fields:

.. list-table::
   :header-rows: 1
   :widths: 35 25 40
 
   * - Property
     - Data type
     - Description

   * - ``x-bsonType``
     - string or array
     - |bson| type of this field.

   * - ``x-metadata``
     - document
     - Document containing metadata about the field.

   * - ``hasDuplicates``
     - boolean
     - ``true`` if a single value appears multiple times in this
       field. Otherwise ``false``.

   * - ``probability``
     - float
     - Probability that the field exists in a random document.

   * - ``count``
     - integer
     - Number of documents from the sample that have this field.

   * - ``x-sampleValues``
     - array
     - Sample values as Expanded JSON. Sample values are limited to
       the first 100 characters.
