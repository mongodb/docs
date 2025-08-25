const deleteProfile = profile => {
  realm.write(() => {
    realm.delete(profile);
  });
};
