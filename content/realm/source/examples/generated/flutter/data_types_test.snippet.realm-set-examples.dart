final realm = Realm(
    Configuration.local([RealmSetExample.schema, SomeRealmModel.schema]));

// Pass native Dart Sets to the object to create RealmSets
final setExample = RealmSetExample(
    primitiveSet: {'apple', 'pear'},
    nullablePrimitiveSet: {null, 2, 3},
    realmObjectSet: {SomeRealmModel(ObjectId())});
// Add RealmObject to database
realm.write(() => realm.add(setExample));

// Once you add the sets, they are of type RealmSet
RealmSet primitiveSet = setExample.primitiveSet;

// Modify RealmSets of RealmObjects in write transactions
realm.write(() {
  // Add element to a RealmSet with RealmSet.add()
  setExample.realmObjectSet.add(SomeRealmModel(ObjectId()));
  // Remove element from a RealmSet with RealmSet.remove()
  setExample.primitiveSet.remove('pear');
});

// Check if a RealmSet contains an element with RealmSet.contains()
if (setExample.primitiveSet.contains('apple')) {
  print('Set contains an apple');
}

// Get RealmSet by property name with dynamic.getSet()
final getSetResult = setExample.dynamic.getSet('primitiveSet');

// Check number of elements in a RealmSet with RealmSet.length
print(
    'Set now has ${getSetResult.length} elements'); // Prints 'Set now has 1 elements'

// Query RealmSets using Realm Query Language
final results =
    realm.query<RealmSetExample>('\$0 IN nullablePrimitiveSet', [null]);
