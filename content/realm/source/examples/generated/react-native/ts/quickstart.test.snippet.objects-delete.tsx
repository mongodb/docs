const deleteProfile = (profile: Profile) => {
  realm.write(() => {
    realm.delete(profile);
  });
};
