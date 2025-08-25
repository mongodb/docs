const addProfile = name => {
  realm.write(() => {
    realm.create('Profile', {
      name: name,
      _id: new Realm.BSON.ObjectId(),
    });
  });
};
