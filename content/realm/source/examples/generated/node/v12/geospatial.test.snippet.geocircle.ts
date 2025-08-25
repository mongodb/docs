const smallCircle: GeoCircle = {
  center: [-121.9, 47.3],
  // The GeoCircle radius is measured in radians.
  // This radian distance corresponds with 0.25 degrees.
  distance: 0.004363323,
};

const largeCircleCenter: GeoPoint = {
  longitude: -122.6,
  latitude: 47.8,
};

// Realm provides `kmToRadians` and `miToRadians`
// to convert these measurements. Import the relevant
// convenience method for your app's needs.
const radiusFromKm = kmToRadians(44.4);

const largeCircle: GeoCircle = {
  center: largeCircleCenter,
  distance: radiusFromKm,
};
