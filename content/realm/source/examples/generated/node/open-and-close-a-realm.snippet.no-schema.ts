// Open the Realm with a schema
const realm = new Realm({ schema: [Car] });

realm.close();

// Reopen it without a schema
const reopenedRealm = new Realm();
