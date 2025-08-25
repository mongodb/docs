const realm = await Realm.open({
  path: "myrealm",
  schema: [Car],
});

let car1;

realm.write(() => {
  car1 = realm.create(Car, {
    make: "Nissan",
    model: "Sentra",
    miles: 1000,
  });
});
