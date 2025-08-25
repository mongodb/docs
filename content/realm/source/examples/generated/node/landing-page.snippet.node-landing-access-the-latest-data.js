// always access the latest data
const realmInstanceA = await Realm.open({
  schema: [Cat],
});
const realmInstanceB = await Realm.open({
  schema: [Cat],
});
// get a reference to a single cat object
// stored in the database from each realm instance
const calicoCatFromRealmInstanceA = realm
  .objects("Cat")
  .filtered("type = 'Calico'")[0];
const calicoCatFromRealmInstanceB = realm
  .objects("Cat")
  .filtered("type = 'Calico'")[0];

// update cat A's name
realm.write(() => {
  calicoCatFromRealmInstanceA.name = "Hestu";
});
// cat B instance automatically updates with the new name
expect(calicoCatFromRealmInstanceB.name).toBe("Hestu");
