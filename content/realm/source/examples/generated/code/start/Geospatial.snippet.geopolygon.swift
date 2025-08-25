// Create a basic polygon
let basicPolygon = GeoPolygon(outerRing: [
    (48.0, -122.8),
    (48.2, -121.8),
    (47.6, -121.6),
    (47.0, -122.0),
    (47.2, -122.6),
    (48.0, -122.8)
])

// Create a polygon with one hole
let outerRing: [GeoPoint] = [
    GeoPoint(latitude: 48.0, longitude: -122.8)!,
    GeoPoint(latitude: 48.2, longitude: -121.8)!,
    GeoPoint(latitude: 47.6, longitude: -121.6)!,
    GeoPoint(latitude: 47.0, longitude: -122.0)!,
    GeoPoint(latitude: 47.2, longitude: -122.6)!,
    GeoPoint(latitude: 48.0, longitude: -122.8)!
]

let hole: [GeoPoint] = [
    GeoPoint(latitude: 47.8, longitude: -122.6)!,
    GeoPoint(latitude: 47.7, longitude: -122.2)!,
    GeoPoint(latitude: 47.4, longitude: -122.6)!,
    GeoPoint(latitude: 47.6, longitude: -122.5)!,
    GeoPoint(latitude: 47.8, longitude: -122.6)!
]

let polygonWithOneHole = GeoPolygon(outerRing: outerRing, holes: [hole])

// Add a second hole to the polygon
let hole2: [GeoPoint] = [
    GeoPoint(latitude: 47.55, longitude: -122.05)!,
    GeoPoint(latitude: 47.55, longitude: -121.9)!,
    GeoPoint(latitude: 47.3, longitude: -122.1)!,
    GeoPoint(latitude: 47.55, longitude: -122.05)!
]

let polygonWithTwoHoles = GeoPolygon(outerRing: outerRing, holes: [hole, hole2])
