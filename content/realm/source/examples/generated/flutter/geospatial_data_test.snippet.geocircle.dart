final smallCircle =
    GeoCircle(GeoPoint(lon: -121.9, lat: 47.3), 0.25.degrees);

final largeCircleCenter = GeoPoint(lon: -122.6, lat: 47.8);

// The SDK provides convenience methods to convert measurements to radians.
final radiusFromKm = GeoDistance.fromKilometers(44.4);

final largeCircle = GeoCircle(largeCircleCenter, radiusFromKm);
