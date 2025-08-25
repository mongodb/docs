const changeProfileName = (profile: Profile, newName: string) => {
  realm.write(() => {
    profile.name = newName;
  });
};
