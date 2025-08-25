// Persons have a to-one relationship with Bikes
final person = realm.query<Person>("firstName == 'Anakin'").first;

// Find all Bikes owned by a Person named 'Anakin'
final allBikes = person.getBacklinks<Bike>('owner');
