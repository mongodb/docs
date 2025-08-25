final realm = Realm(Configuration.local([RealmValueExample.schema]));

realm.write(() {
  // Use 'RealmValue.from()' to set values
  var anyValue = realm.add(RealmValueExample(
      // Add a single `RealmValue` value
      singleAnyValue: RealmValue.from(1),
      // Add a list of `RealmValue` values
      listOfMixedAnyValues: [Uuid.v4(), 'abc', 123].map(RealmValue.from),
      // Add a set of `RealmValue` values
      setOfMixedAnyValues: {
        RealmValue.from('abc'),
        RealmValue.from('def')
      },
      // Add a map of string keys and `RealmValue` values
      mapOfMixedAnyValues: {
        '1': RealmValue.from(123),
        '2': RealmValue.from('abc')
      }));

  // Use 'RealmValue.nullValue()' to set null values
  var anyValueNull = realm.add(RealmValueExample(
      singleAnyValue: RealmValue.nullValue(),
      listOfMixedAnyValues: [null, null].map(RealmValue.from),
      setOfMixedAnyValues: {RealmValue.nullValue()},
      mapOfMixedAnyValues: {'null': RealmValue.nullValue()}));

