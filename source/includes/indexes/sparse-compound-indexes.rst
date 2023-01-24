Compound indexes can contain different types of sparse indexes. The
combination of index types determines how the compound index matches
documents. 

A compound index that only contains ascending or descending sparse index
keys, only indexes documents if the document contains at least one of
the keys

A compound index that contains ascending or descending sparse index keys
and:

- a :ref:`geospatial index <index-feature-geospatial>`, only indexes
  documents when a document  matches one of the geospatial fields
- a :ref:`text index <index-feature-text>`, only indexes documents when
  a document matches the ``text`` field

