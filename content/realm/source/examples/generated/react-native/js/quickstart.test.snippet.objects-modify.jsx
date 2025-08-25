const changeProfileName = (profile, newName) => {
  realm.write(() => {
    profile.name = newName;
  });
};
