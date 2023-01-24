Compound indexes can contain different types of sparse indexes. The
combination of index types determines how the compound index matches
documents. Compound indexes that contain:

- only ascending or descending sparse index keys, index documents if the
  document contains at least one of the keys
- ascending or descending sparse index keys and a :ref:`geospatial
  index <index-feature-geospatial>`, index documents when a document
  matches one of the geospatial fields
- ascending or descending sparse index keys and a :ref:`text index
  <index-feature-text>`, index documents when a document matches the
  ``text`` field

