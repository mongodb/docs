Compound indexes can contain different types of sparse indexes. The
combination of index types determines how the compound index matches
documents. 

.. list-table::
  :header-rows: 1

  * - Index Contents
    - Index Behavior

  * - | Ascending sparse indexes
      | Descending sparse indexes
    - Only indexes documents that contain a value for at least one of
      the keys.

  * - | Ascending sparse indexes
      | Descending sparse indexes
      | :ref:`Geospatial index <index-feature-geospatial>`
    - Only indexes documents when a document contains a value for one of
      the ``geospatial`` fields.

  * - | Ascending sparse indexes
      | Descending sparse indexes
      | :ref:`Text index <index-feature-text>`
    - Only indexes documents when a document matches one of the ``text``
      fields.

