// Scooters have a to-many relationship with ScooterShops
final scooters = realm.query<Scooter>("name == 'Scooterbug'").first;

// Find all ScooterShops with a Scooter named 'Scooterbug'
final shops = scooters.getBacklinks<ScooterShop>('scooters');

