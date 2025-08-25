const realm = await Realm.open({
    schema: [Dog],
    schemaVersion: 2
  });