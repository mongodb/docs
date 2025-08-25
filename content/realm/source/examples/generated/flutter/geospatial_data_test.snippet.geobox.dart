final largeBox = GeoBox(
    GeoPoint(lon: -122.7, lat: 47.3), GeoPoint(lon: -122.1, lat: 48.1));

final smallBoxSouthWest = GeoPoint(lon: -122.4, lat: 47.5);
final smallBoxNorthEast = GeoPoint(lon: -121.8, lat: 47.9);
final smallBox = GeoBox(smallBoxSouthWest, smallBoxNorthEast);
