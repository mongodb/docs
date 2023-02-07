Compound indexes can contain different types of sparse indexes. The
combination of index types determines how the compound index matches
documents. 

A compound index that has the sparse property and that only contains
ascending or descending indexes only indexes documents that contain a
value for at least one of the keys.

A compound index that contains ascending or descending sparse indexes
and:

- a :ref:`geospatial index <index-feature-geospatial>`, only indexes
  documents when a document contains a value for one of the geospatial
  fields
- a :ref:`text index <index-feature-text>`, only indexes documents when
  a document matches one of the ``text`` fields

