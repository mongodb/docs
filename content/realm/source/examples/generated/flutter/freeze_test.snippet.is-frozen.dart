// You can check if all freezable types are frozen
// with the `isFrozen` property.

final realm = Realm(config);
print(realm.isFrozen);

final people = realm.all<Person>();
print(people.isFrozen);

final firstPerson =
    realm.query<Person>("firstName = \$0", ["Yoda"]).first;
print(firstPerson.isFrozen);

final firstPersonAttributes = firstPerson.attributes;
print(firstPersonAttributes.isFrozen);
