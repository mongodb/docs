class MyGeoPoint {
  type = "Point";

  constructor(long, lat) {
    this.coordinates = [long, lat];
  }

  static schema = {
    name: "MyGeoPoint",
    embedded: true,
    properties: {
      type: "string",
      coordinates: "double[]",
    },
  };
}
