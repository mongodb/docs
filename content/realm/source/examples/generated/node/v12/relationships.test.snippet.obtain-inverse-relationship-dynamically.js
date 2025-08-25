const carObjects = realm.objects(Car);
// Get the Manufacturer who makes the Car
const linkedManufacturer = carObjects[0].linkingObjects(
  "Manufacturer",
  "cars"
)[0];
expect(linkedManufacturer.name).toBe("Nissan");
