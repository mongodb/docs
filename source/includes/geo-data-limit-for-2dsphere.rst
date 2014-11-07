Fields with :doc:`2dsphere </core/2dsphere>` indexes must hold geometry
data in the form of :term:`coordinate pairs <legacy coordinate pairs>`
or :term:`GeoJSON` data. If you attempt to insert a document with
non-geometry data in a ``2dsphere`` indexed field, or build a
``2dsphere`` index on a collection where the indexed field has
non-geometry data, the operation will fail.
