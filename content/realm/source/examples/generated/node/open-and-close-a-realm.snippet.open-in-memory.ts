const realm = await Realm.open({
  inMemory: true,
  schema: [Car],
});
