const LastSyncedSchema = {
  name: "LastSynced",
  properties: {
    realmTracked: "string",
    timestamp: "int?",
  },
  primaryKey: "realmTracked",
};
const lastSyncedConfig = { schema: [LastSyncedSchema] };
const lastSyncedRealm = await Realm.open(lastSyncedConfig);
lastSyncedRealm.write(() => {
  lastSyncedRealm.create("LastSynced", {
    realmTracked: "Dog",
  });
});
