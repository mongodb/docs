var basicPolygon = new GeoPolygon((48, -122.8),
    (48.2, -121.8), (47.6, -121.6), (47.0, -122.0),
    (47.2, -122.6), (48, -122.8));

// Create a polygon with a single hole
var outerRing = new GeoPoint[] {
    (48, -122.8), (48.2, -121.8),
    (47.6, -121.6), (47.0, -122.0), (47.2, -122.6),
    (48, -122.8) };

var hole1 = new GeoPoint[] {
    (47.8, -122.6), (47.7, -122.2),
    (47.4, -122.6), (47.6, -122.5),
    (47.8, -122.6) };

var polygonWithOneHole = new GeoPolygon(outerRing, hole1);

// Add a second hole to the polygon
var hole2 = new GeoPoint[] {
    (47.55, -122.05), (47.5, -121.9),(47.3, -122.1),
    (47.55, -122.05) };

var polygonWithTwoHoles =
    new GeoPolygon(outerRing, hole1, hole2);
