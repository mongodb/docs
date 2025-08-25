// Create a basic polygon
val basicPolygon = GeoPolygon.create(
    listOf(
        GeoPoint.create(48.0, -122.8),
        GeoPoint.create(48.2, -121.8),
        GeoPoint.create(47.6, -121.6),
        GeoPoint.create(47.0, -122.0),
        GeoPoint.create(47.2, -122.6),
        GeoPoint.create(48.0, -122.8)
    )
)

// Create a polygon with a single hole
val outerRing = listOf(
        GeoPoint.create(48.0, -122.8),
        GeoPoint.create(48.2, -121.8),
        GeoPoint.create(47.6, -121.6),
        GeoPoint.create(47.0, -122.0),
        GeoPoint.create(47.2, -122.6),
        GeoPoint.create(48.0, -122.8)
)

val hole1 = listOf(
        GeoPoint.create(47.8, -122.6),
        GeoPoint.create(47.7, -122.2),
        GeoPoint.create(47.4, -122.6),
        GeoPoint.create(47.6, -122.5),
        GeoPoint.create(47.8, -122.6)
)

val polygonWithOneHole = GeoPolygon.create(outerRing, hole1)

// Add a second hole to the polygon
val hole2 = listOf(
    GeoPoint.create(47.55, -122.05),
    GeoPoint.create(47.5, -121.9),
    GeoPoint.create(47.3, -122.1),
    GeoPoint.create(47.55, -122.05)
)

val polygonWithTwoHoles = GeoPolygon.create(outerRing, hole1, hole2)
