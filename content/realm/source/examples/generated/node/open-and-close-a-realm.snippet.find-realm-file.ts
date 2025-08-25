// Open a realm.
const realm = await Realm.open({
  schema: [Car],
});

// Get on-disk location of the Realm
const realmFileLocation = realm.path;

console.log(`Realm file is located at: ${realm.path}`);
