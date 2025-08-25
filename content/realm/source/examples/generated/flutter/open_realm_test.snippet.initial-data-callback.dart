void dataCb(Realm realm) {
  realm.add(Car(ObjectId(), 'Honda'));
}

final config =
    Configuration.local([Car.schema], initialDataCallback: dataCb);
final realm = Realm(config);
Car honda = realm.all<Car>()[0];
