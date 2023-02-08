Compound indexes can contain different types of sparse indexes. The
combination of index types determines how the compound index matches
documents. 

This table summarizes the behavior of a compound index that contains
different types of sparse indexes:

.. list-table::
  :header-rows: 1

  * - Sparse Index Type
    - Compound Index Behavior

  * - | Ascending indexes
      | Descending indexes
    - Only indexes documents that contain a value for at least one of
      the keys.

  * - | Ascending indexes
      | Descending indexes
      | :ref:`Geospatial indexes <index-feature-geospatial>`
    - Only indexes documents when a document contains a value for one of
      the ``geospatial`` fields.

  * - | Ascending indexes
      | Descending indexes
      | :ref:`Text indexes <index-feature-text>`
    - Only indexes documents when a document matches one of the ``text``
      fields.

