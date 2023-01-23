Sparse :ref:`compound indexes <index-type-compound>` that contain:

- only ascending or descending index keys: index documents if the
  document contains at least one of the keys
- ascending or descending index keys and a geospatial field: index
  documents when a document matches one of the geospatial fields
- ascending or descending index keys and a :ref:`text index
  <index-feature-text>`: index documents when a document matches the
  ``text`` field

