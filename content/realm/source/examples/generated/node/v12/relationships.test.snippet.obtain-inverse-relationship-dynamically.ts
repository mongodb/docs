const carObjects = realm.objects<Car>(Car);
// Get the Manufacturer who makes the Car
const linkedManufacturer: Manufacturer =
  carObjects[0].linkingObjects<Manufacturer>("Manufacturer", "cars")[0];
expect(linkedManufacturer.name).toBe("Nissan");
