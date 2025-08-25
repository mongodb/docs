// You can create a GeoCircle radius measured in radians.
// This radian distance corresponds with 0.25 degrees.
let smallCircle = GeoCircle(center: (47.3, -121.9), radiusInRadians: 0.004363323)

// You can also create a GeoCircle radius measured with a Distance.
// You can specify a Distance in .degrees, .kilometers, .miles, or .radians.
let largeCircle = GeoCircle(center: GeoPoint(latitude: 47.8, longitude: -122.6)!, radius: Distance.kilometers(44.4)!)
