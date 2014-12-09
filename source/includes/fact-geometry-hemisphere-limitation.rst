For |geo-operator-method| queries, :term:`GeoJSON` geometries **must**
have an area less than the area of a single hemisphere. For geometries
larger than a single hemisphere, MongoDB queries for the smaller of the
complementary geometries. For geometries equal to a single hemisphere,
MongoDB makes no guarantees as to which geometry (the specified
geometry or the complementary) it uses.
