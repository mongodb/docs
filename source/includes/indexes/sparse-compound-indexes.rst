Sparse :ref:`compound indexes <index-type-compound>` that only contain
ascending/descending index keys will index a document as long as the
document contains at least one of the keys.

For sparse compound indexes that contain a geospatial key (i.e.
``2dsphere``, ``2d``, or ``geoHaystack`` index keys) along 
with ascending/descending index key(s), only the existence of the 
geospatial field(s) in a document determine whether the index 
references the document.

For sparse compound indexes that contain :ref:`text 
<index-feature-text>` index keys along with ascending/descending index 
keys, only the existence of the ``text`` index field(s) determine 
whether the index references a document.
