const realm = await Realm.open({
    schema: [Person],
    schemaVersion: 2
  });