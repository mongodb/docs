Configure |fts-field-type| Field Properties 
-------------------------------------------

The |fts| ``geo`` type takes the following parameters:

.. list-table::
   :widths: 15 10 10 55 10
   :header-rows: 1

   * - Option
     - Type 
     - Necessity
     - Description
     - Default

   * - ``type``
     - string 
     - Required
     - Human-readable label that identifies this field type.
       UI value must be ``Geo`` and |json| value must be ``geo``. 
     - 

   * - ``indexShapes`` 
     - boolean 
     - Optional
     - Flag that indicates whether to index shapes. By default, |fts|: 

       - Indexes points, even when nested.
       - Doesn't index shape geometries such as lines and polygons.

       Value can be: 

       - ``true`` to index shapes and points 
       - ``false`` to index only points
     - ``false``