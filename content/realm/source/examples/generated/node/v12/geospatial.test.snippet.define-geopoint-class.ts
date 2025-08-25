// Implement `CanonicalGeoPoint`
// for convenience when persisting geodata.
class MyGeoPoint implements CanonicalGeoPoint {
  coordinates!: GeoPosition;
  type = "Point" as const;

  constructor(long: number, lat: number) {
    this.coordinates = [long, lat];
  }

  static schema: ObjectSchema = {
    name: "MyGeoPoint",
    embedded: true,
    properties: {
      type: "string",
      coordinates: "double[]",
    },
  };
}
