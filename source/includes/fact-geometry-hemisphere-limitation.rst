Any geometry specified with :term:`GeoJSON` to |geo-operator-method|
queries, **must** fit within a single hemisphere. MongoDB interprets
geometries larger than half of the sphere as queries for the smaller
of the complementary geometries.
