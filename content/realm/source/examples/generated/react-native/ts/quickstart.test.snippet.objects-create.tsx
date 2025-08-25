const addProfile = (name: string) => {
  realm.write(() => {
    realm.create('Profile', {
      name: name,
      _id: new Realm.BSON.ObjectId(),
    });
  });
};
