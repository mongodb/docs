Configure |fts-field-type| Field Properties 
-------------------------------------------

The |fts| ``number`` type has the following parameters: 

.. list-table::
   :widths: 15 15 10 10 40 10
   :header-rows: 1

   * - UI Field Name 
     - JSON Option
     - Type 
     - Necessity
     - Description
     - Default

   * - :guilabel:`Data Type`
     - ``type``
     - string 
     - Required
     - Human-readable label that identifies this field type.
       Value must be ``number``.
     - 

   * - :guilabel:`Representation` 
     - ``representation``
     - string 
     - Optional
     - Data type of the field to index. Values are:

       - ``int64`` - for indexing large integers without loss of 
         precision and for rounding double values to integers. You 
         can't use this type to index large double values.
       - ``double`` - for indexing large double values without rounding.

     - ``double``

   * - :guilabel:`Index Integers` 
     -  ``indexIntegers``
     - boolean 
     - Optional
     - Flag that indicates whether to index or omit indexing ``int32`` 
       and ``int64`` type values. Value can be ``true`` or ``false``. 
       Either this or ``indexDoubles`` must be ``true``.

     - ``true``

   * - :guilabel:`Index Doubles` 
     -  ``indexDoubles``
     - boolean 
     - Optional
     - Flag that indicates whether to index or omit indexing ``double``
       type values. Value can be ``true`` or ``false``. 
       Either this or ``indexIntegers`` must be ``true``.

     - ``true``
